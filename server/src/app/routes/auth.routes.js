import { Router } from "express";
import passport from "passport";
import mongoose from "mongoose";
import { body } from "express-validator";
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
    res.send(req.user.id);
  }
);

routes.post("/auth/register", (req, res) => {
  const { username, email, displayName } = req.body;
  const newUser = new User({ username, email, displayName });

  // Insere o usuário no banco
  // eslint-disable-next-line no-unused-vars
  User.register(newUser, req.body.password, (err, user) => {
    if (err) {
      res.status(500).send({ msg: err });
      res.redirect("/register");
    }

    // Autentica o usuário
    passport.authenticate("local")(req, res, () => {
      res.send(req.user.id);
    });
  });
});

// Google auth routes
routes.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

routes.get(
  "/auth/google/callback",
  passport.authenticate("google"),
  (req, res) => {
    res.redirect("/");
  }
);

// Facebook auth routes
routes.get(
  "/auth/facebook",
  passport.authenticate("facebook", {
    scope: ["email"],
  })
);

routes.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook"),
  (req, res) => {
    res.redirect("/");
  }
);

// Rota para iniciar o fluxo de recuperação de senha
routes.post(
  "/auth/forgot/password",
  // [body("email").isEmail().normalizeEmail()],
  (req, res) => {
    // Primeiro acha o usuário
    User.findOne({ email: req.body.email }, (err, foundUser) => {
      if (err) {
        res.status(500).send({ msg: err.message });
      } else if (!foundUser) {
        res.status(400).send({ msg: "Usuário não encontrado" });
      } else {
        // Se estiver tudo certo cria um novo token e manda um novo email
        const token = crypto.randomBytes(16).toString("hex");

        Token.create(
          { _userId: foundUser._id, token, passwordReset: true },
          (error, newToken) => {
            if (error) {
              res.status(500).send({ msg: error });
            } else {
              // Envia o email de verificação
              const transporter = nodemailer.createTransport(
                sgTransport({
                  auth: {
                    api_user: keys.sendgridUsername,
                    api_key: keys.sendgridPassword,
                  },
                })
              );
              const mailOptions = {
                from: keys.sendgridEmail,
                to: foundUser.email,
                subject: "Seu token de recuperação de senha na 5Pots",
                text: `Olá,
          Para redefinir sua senha clique no link abaixo: 
          ${url}/auth/reset/${newToken.token}`,
              };
              transporter.sendMail(mailOptions, (erro) => {
                if (erro) {
                  res.status(500).send({ msg: erro });
                } else {
                  res.status(200).send({
                    msg: `Um email de verificação foi enviado para ${foundUser.username}.`,
                  });
                }
              });
            }
          }
        );
      }
    });
  }
);

// Rota para iniciar o fluxo de recuperação de senha
routes.post(
  "/auth/forgot/username",
  // [body("email").isEmail().normalizeEmail()],
  (req, res) => {
    // Primeiro acha o usuário
    User.find({ email: req.body.email }, (err, foundUser) => {
      if (err) {
        res.status(500).send({ msg: err.message });
      } else if (!foundUser) {
        res.status(400).send({ msg: "Usuário não encontrado" });
      } else {
        // Verifica o tipo de cadastro da pessoa
        const hasUsername = foundUser.filter((userObj) => userObj.username);
        const hasGoogle = foundUser.filter((userObj) => userObj.googleID);
        const hasFacebook = foundUser.filter((userObj) => userObj.facebookID);

        // Envia o email de verificação
        const transporter = nodemailer.createTransport(
          sgTransport({
            auth: {
              api_user: keys.sendgridUsername,
              api_key: keys.sendgridPassword,
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
          from: keys.sendgridEmail,
          to: foundUser[0].email || foundUser.email,
          subject: "Seu token de recuperação de senha na 5Pots",
          text: `Olá,
Aqui vai seus cadastros na 5pots:
          
${mailBody}

Se você não pediu para receber um email com seu usuário, só ignore esse email, alguém provavelmente digitou ele por engano e não tem sua senha :)`,
        };

        transporter.sendMail(mailOptions, (erro) => {
          if (erro) {
            res.status(500).send({ msg: erro });
          } else {
            res.status(200).send({
              msg: `Um email de verificação foi enviado para ${foundUser.username}.`,
            });
          }
        });
      }
    });
  }
);

// Rota para reenviar o token de verificação de email
routes.post(
  "/auth/confirmation/resend",
  [body("username").isEmail().normalizeEmail()],
  (req, res) => {
    // Primeiro acha o usuário
    User.findOne({ username: req.body.username }, (err, foundUser) => {
      if (err) {
        res.status(500).send({ msg: err.message });
      } else if (!foundUser) {
        res.status(400).send({ msg: "Usuário não encontrado" });
      } else if (foundUser.isVerified) {
        res.status(418).send({ msg: "Esse usuário já é verificado" });
      } else {
        // Se estiver tudo certo cria um novo token e manda um novo email
        const token = crypto.randomBytes(16).toString("hex");
        Token.create({ _userId: foundUser._id, token }, (error, newToken) => {
          if (error) {
            res.status(500).send({ msg: error });
          } else {
            // Envia o email de verificação
            const transporter = nodemailer.createTransport({
              service: "Sendgrid",
              auth: {
                user: keys.sendgridUsername,
                pass: keys.sendgridPassword,
              },
            });
            const mailOptions = {
              from: "no-reply@5pots.com",
              to: foundUser.username,
              subject: "Bem-vindo a 5pots! Confirme seu email",
              text: `Olá,
          Por favor verifique sua conta entrando no link a seguir: 
          http://${req.headers.host}/confirmation/${newToken.token}`,
            };
            transporter.sendMail(mailOptions, (erro) => {
              if (erro) {
                res.status(500).send({ msg: erro });
              } else {
                res.status(200).send({
                  msg: `Um email de verificação foi enviado para ${foundUser.username}.`,
                });
              }
            });
          }
        });
      }
    });
  }
);

// Rota para atualizar a senha do usuário
routes.post("/auth/forgot/:tokenId", (req, res) => {
  Token.findOne({ token: req.params.tokenId }, (err, foundToken) => {
    if (err || !foundToken || !foundToken.passwordReset) {
      res.status(400).send({ msg: "Token inválido ou expirado." });
    } else if (req.body.password !== req.body.confirmation) {
      res.status(400).send({ msg: "As senhas não são iguais" });
    } else
      User.findOne({ _id: foundToken._userId }, (error, foundUser) => {
        foundUser.setPassword(req.body.password, (er) => {
          if (er) {
            res.status(500).send({ msg: err.message });
          } else {
            // Aqui já achou o usuário e atualizou a senha, só deletar o token
            Token.deleteOne({ token: req.params.tokenId }, (erro) => {
              if (erro) {
                res.status(500).send({
                  msg: `Nenhuma alteração foi feita na sua conta. Erro: ${err.message}`,
                });
              } else {
                foundUser.save((e) => {
                  if (e) {
                    res.status(500).send({
                      msg: `Nenhuma alteração foi feita na sua conta. Erro: ${e.message}`,
                    });
                  } else {
                    res.status(200).send({
                      msg: `Sua senha foi alterada com sucesso.`,
                    });
                  }
                });
              }
            });
          }
        });
      });
  });
});

// Rota para validar o token de troca de senha
routes.get("/auth/confirmation/validate/:tokenId", (req, res) => {
  // Procura se o token existe na coleção de tokens
  Token.findOne({ token: req.params.tokenId }, (err, foundToken) => {
    if (err || !foundToken || !foundToken.passwordReset) {
      res.status(400).send({ msg: "Token inválido ou expirado." });
    } else {
      res.status(200).send({ msg: "Digite uma nova senha:" });
    }
  });
});

// Rota para validar o email do usuário
routes.get("/auth/confirmation/:tokenId", (req, res) => {
  // Procura se o token existe na coleção de tokens
  Token.findOne({ token: req.params.tokenId }, (err, foundToken) => {
    if (err || !foundToken || foundToken.passwordReset) {
      res.status(400).send({ msg: "Token inválido ou expirado." });
    } else {
      // Se existe o token, procura o usuário associa
      User.findOne({ _id: foundToken._userId }, (error, foundUser) => {
        if (error) {
          res.status(500).send({ msg: error.message });
        } else if (foundUser.isVerified) {
          res.status(418).send({ msg: "Usuário já verificado" });
        } else {
          // Se chegou até aqui, verifica o usuário
          // eslint-disable-next-line no-param-reassign
          foundUser.isVerified = true;
          foundUser.save((er) => {
            if (er) res.status(500).send({ msg: er.message });
            res
              .status(200)
              .send({ msg: "Sua conta foi verificada com sucesso!" });
          });
        }
      });
    }
  });
});

// API Routes
routes.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

routes.get("/current_user", (req, res) => {
  res.send(req.user);
});

export default routes;
