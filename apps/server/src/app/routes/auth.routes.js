import { Router } from "express";
import passport from "passport";
import mongoose from "mongoose";
import nodemailer from "nodemailer";
import sgTransport from "nodemailer-sendgrid-transport";
import crypto from "crypto";

import keys from "../../config/keys";
import url from "../../config/url";

const User = mongoose.model("users");
const Token = mongoose.model("tokens");

const routes = Router();

/* TODO: Arrumar usuário não existente, usuário só por FB etc */
routes.post(
  "/auth/login",
  passport.authenticate("local", { failureRedirect: "/login" }),
  (req, res) => {
    const { id, displayName, email, isAdmin, isVerified, username } = req.user;
    res.send({ id, displayName, email, isAdmin, isVerified, username });
  }
);

routes.post("/auth/register", (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    displayName: req.body.displayName,
  });

  // Insere o usuário no banco
  // eslint-disable-next-line no-unused-vars
  User.register(newUser, req.body.password, (err, user) => {
    if (err) {
      return err.name === "UserExistsError"
        ? res.status(409).send({ msg: "O usuário informado já existe" })
        : res.status(500).send({ msg: err.message });
    }

    // Autentica o usuário
    passport.authenticate("local")(req, res, () => {
      const {
        id,
        displayName,
        email,
        isAdmin,
        isVerified,
        username,
      } = req.user;
      return res.send({
        id,
        displayName,
        email,
        isAdmin,
        isVerified,
        username,
      });
    });
  });
});

// Google auth routes
// routes.get(
//   "/auth/google",
//   passport.authenticate("google", {
//     scope: ["profile", "email"],
//   })
// );

// routes.get(
//   "/auth/google/callback",
//   passport.authenticate("google"),
//   (req, res) => {
//     return res.redirect("/");
//   }
// );

// Facebook auth routes
// routes.get(
//   "/auth/facebook",
//   passport.authenticate("facebook", {
//     scope: ["email"],
//   })
// );

// routes.get(
//   "/auth/facebook/callback",
//   passport.authenticate("facebook"),
//   (req, res) => {
//     return res.redirect("/");
//   }
// );

// Rota para iniciar o fluxo de recuperação de senha
routes.post("/auth/forgot/password", (req, res) => {
  // Primeiro acha o usuário
  User.findOne({ email: req.body.email }, (err, foundUser) => {
    if (err) {
      return res.status(500).send({ msg: err.message });
    }
    if (!foundUser) {
      return res.status(400).send({ msg: "Usuário não encontrado" });
    }
    // Se estiver tudo certo cria um novo token e manda um novo email
    const token = crypto.randomBytes(16).toString("hex");

    Token.create(
      { _userId: foundUser._id, token, passwordReset: true },
      (error, newToken) => {
        if (error) {
          return res.status(500).send({ msg: error.message || error });
        }
        // Envia o email de verificação
        const transporter = nodemailer.createTransport(
          sgTransport({
            auth: {
              api_user:
                keys.sendgridUsername ||
                "Hey! crie um dev.js na pasta config/keys com suas chaves",
              api_key:
                keys.sendgridPassword ||
                "Hey! crie um dev.js na pasta config/keys com suas chaves",
            },
          })
        );
        const mailOptions = {
          from: keys.sendgridEmail,
          to: foundUser.email,
          subject: "Seu token de recuperação de senha na 5Pots",
          text: `Olá,
          Para redefinir sua senha clique no link abaixo:
          ${url}/auth/reset?token=${newToken.token}`,
        };
        transporter.sendMail(mailOptions, (erro) => {
          if (erro) {
            return res.status(500).send({ msg: erro.message || erro });
          }
          return res.status(200).send({
            msg: `Um email de verificação foi enviado para ${foundUser.username}.`,
          });
        });
      }
    );
  });
});

// Rota para iniciar o fluxo de recuperação de senha
routes.post("/auth/forgot/username", (req, res) => {
  // Primeiro acha o usuário
  User.find({ email: req.body.email }, (err, foundUser) => {
    if (err) {
      return res.status(500).send({ msg: err.message });
    }
    if (!foundUser) {
      return res.status(400).send({ msg: "Usuário não encontrado" });
    }
    // Verifica o tipo de cadastro da pessoa
    const hasUsername = foundUser.filter((userObj) => userObj.username);
    const hasGoogle = foundUser.filter((userObj) => userObj.googleID);
    const hasFacebook = foundUser.filter((userObj) => userObj.facebookID);

    // Envia o email de verificação
    const transporter = nodemailer.createTransport(
      sgTransport({
        auth: {
          api_user:
            keys.sendgridUsername ||
            "Hey! crie um dev.js na pasta config/keys com suas chaves",
          api_key:
            keys.sendgridPassword ||
            "Hey! crie um dev.js na pasta config/keys com suas chaves",
        },
      })
    );

    const mailBody = `Nome de usuário: ${
      hasUsername.length > 0
        ? hasUsername[0].username
        : "Não possui usuário local."
    }
Google: ${
      hasGoogle.length > 0
        ? "Você possui cadastro Google com esse e-mail."
        : "Não está cadastrado com o Google."
    }
Facebook: ${
      hasFacebook.length > 0
        ? "Você possui cadastro Facebook com esse e-mail."
        : "Não está cadastrado com o Facebook."
    }`;

    const mailOptions = {
      from:
        keys.sendgridEmail ||
        "Hey! crie um dev.js na pasta config/keys com suas chaves",
      to: foundUser[0].email || foundUser.email,
      subject: "Seu token de recuperação de senha na 5Pots",
      text: `Olá,
Aqui vai seus cadastros na 5pots:

${mailBody}

Se você não pediu para receber um email com seu usuário, só ignore esse email, alguém provavelmente digitou ele por engano e não tem sua senha :)`,
    };

    transporter.sendMail(mailOptions, (erro) => {
      if (erro) {
        return res.status(500).send({ msg: erro.message || erro });
      }
      return res.status(200).send({
        msg: `Um email de verificação foi enviado para ${foundUser.username}.`,
      });
    });
  });
});

// Rota para reenviar o token de verificação de email
routes.post("/auth/confirmation/resend", (req, res) => {
  // Primeiro acha o usuário
  User.findOne({ username: req.body.username }, (err, foundUser) => {
    if (err) {
      return res.status(500).send({ msg: err.message });
    }
    if (!foundUser) {
      return res.status(400).send({ msg: "Usuário não encontrado" });
    }
    if (foundUser.isVerified) {
      return res.status(418).send({ msg: "Esse usuário já é verificado" });
    }
    // Se estiver tudo certo cria um novo token e manda um novo email
    const token = crypto.randomBytes(16).toString("hex");
    Token.create({ _userId: foundUser._id, token }, (error, newToken) => {
      if (error) {
        return res.status(500).send({ msg: error.message || error });
      }
      // Envia o email de verificação
      const transporter = nodemailer.createTransport({
        service: "Sendgrid",
        auth: {
          user:
            keys.sendgridUsername ||
            "Hey! crie um dev.js na pasta config/keys com suas chaves",
          pass:
            keys.sendgridPassword ||
            "Hey! crie um dev.js na pasta config/keys com suas chaves",
        },
      });
      const mailOptions = {
        from:
          keys.sendgridEmail ||
          "Hey! crie um dev.js na pasta config/keys com suas chaves",
        to: foundUser.username,
        subject: "Bem-vindo a 5pots! Confirme seu email",
        text: `Olá,
          Por favor verifique sua conta entrando no link a seguir:
          http://${req.headers.host}/confirmation/${newToken.token}`,
      };
      transporter.sendMail(mailOptions, (erro) => {
        if (erro) {
          return res.status(500).send({ msg: erro });
        }
        return res.status(200).send({
          msg: `Um email de verificação foi enviado para ${foundUser.username}.`,
        });
      });
    });
  });
});

// Rota para atualizar a senha do usuário
routes.post("/auth/forgot/:tokenId", (req, res) => {
  Token.findOne({ token: req.params.tokenId }, (err, foundToken) => {
    if (err || !foundToken || !foundToken.passwordReset) {
      return res.status(400).send({ msg: "Token inválido ou expirado." });
    }
    if (req.body.password !== req.body.confirmation) {
      return res.status(400).send({ msg: "As senhas não são iguais" });
    }
    User.findOne({ _id: foundToken._userId }, (error, foundUser) => {
      foundUser.setPassword(req.body.password, (er) => {
        if (er) {
          return res.status(500).send({ msg: err.message });
        }
        // Aqui já achou o usuário e atualizou a senha, só deletar o token
        Token.deleteOne({ token: req.params.tokenId }, (erro) => {
          if (erro) {
            return res.status(500).send({
              msg: `Nenhuma alteração foi feita na sua conta. Erro: ${err.message}`,
            });
          }
          foundUser.save((e) => {
            if (e) {
              return res.status(500).send({
                msg: `Nenhuma alteração foi feita na sua conta. Erro: ${e.message}`,
              });
            }
            return res.status(200).send({
              msg: `Sua senha foi alterada com sucesso.`,
            });
          });
        });
      });
    });
  });
});

// Rota para validar o token de troca de senha
routes.get("/auth/confirmation/validate/:tokenId", (req, res) => {
  // Procura se o token existe na coleção de tokens
  Token.findOne({ token: req.params.tokenId }, (err, foundToken) => {
    if (err || !foundToken || !foundToken.passwordReset) {
      return res.status(400).send({ msg: "Token inválido ou expirado." });
    }
    return res.status(200).send({ msg: "Digite uma nova senha:" });
  });
});

// Rota para validar o email do usuário
routes.get("/auth/confirmation/:tokenId", (req, res) => {
  // Procura se o token existe na coleção de tokens
  Token.findOne({ token: req.params.tokenId }, (err, foundToken) => {
    if (err || !foundToken || foundToken.passwordReset) {
      return res.status(400).send({ msg: "Token inválido ou expirado." });
    }
    // Se existe o token, procura o usuário associa
    User.findOne({ _id: foundToken._userId }, (error, foundUser) => {
      if (error) {
        return res.status(500).send({ msg: error.message });
      }
      if (foundUser.isVerified) {
        return res.status(418).send({ msg: "Usuário já verificado" });
      }
      // Se chegou até aqui, verifica o usuário
      // eslint-disable-next-line no-param-reassign
      foundUser.isVerified = true;
      foundUser.save((er) => {
        if (er) return res.status(500).send({ msg: er.message });
        return res
          .status(200)
          .send({ msg: "Sua conta foi verificada com sucesso!" });
      });
    });
  });
});

// API Routes
routes.get("/logout", (req, res) => {
  req.logout();
  return res.redirect("/");
});

routes.get("/current_user", (req, res) => {
  return res.send(req.user);
});

export default routes;
