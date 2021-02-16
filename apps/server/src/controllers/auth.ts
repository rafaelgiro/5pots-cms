import { NextFunction, Request, Response } from "express";
import crypto from "crypto";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import nodemailerSendgrid from "nodemailer-sendgrid";
import { validationResult } from "express-validator";

import { HttpException } from "../middlewares/error";
import User, { UserI } from "../models/user";
import Token, { TokenI } from "../models/token";
import { issueJWT } from "../lib/utils";

const login = (req: Request, res: Response, next: NextFunction) => {
  const { username, password } = req.body;
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    return next(new HttpException(400, String(validationErrors.array()[0])));
  }

  User.findOne({ username }).then((user) => {
    if (!user) {
      next(new HttpException(401, "Usuário não encontrado."));
    } else {
      const validPw = bcrypt.compareSync(password, user.hash);
      if (!validPw) {
        next(new HttpException(401, "Senha incorreta."));
      } else {
        const jwt = issueJWT(user);
        res.status(201).json({ token: jwt.token });
      }
    }
  });
};

const register = async (req: Request, res: Response, next: NextFunction) => {
  const { username, password, displayName, email } = req.body;
  const salt = bcrypt.genSaltSync(12);
  const hash = bcrypt.hashSync(password, salt);
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    return next(
      new HttpException(400, String(validationErrors.array()[0].msg))
    );
  }

  const userExist = await User.exists({ username });
  if (userExist) {
    return next(new HttpException(409, "O usuário informado já existe."));
  }

  const newUser = new User({
    username,
    hash,
    email,
    displayName: displayName || username,
  });

  newUser
    .save()
    .then((user) => {
      const jwt = issueJWT(user);
      res.status(201).json({ token: jwt.token });
    })
    .catch(() =>
      next(
        new HttpException(
          500,
          "Deu algo errado do nosso lado. Tente novamente mais tarde."
        )
      )
    );
};

const refresh = (req: Request, res: Response, next: NextFunction) => {
  if (req.user) {
    const jwt = issueJWT(req.user as UserI);
    res.status(201).json({ token: jwt.token });
  } else {
    next(new HttpException(401, "Não autorizado."));
  }
};

// Rota para validar o token de troca de senha
const isTokenValid = (req: Request, res: Response, next: NextFunction) => {
  // Procura se o token existe na coleção de tokens
  const token = String(req.query.token);
  Token.findOne({ token }, (err: Error, foundToken: TokenI) => {
    if (err || !foundToken || !foundToken.passwordReset) {
      return next(new HttpException(400, "Token inválido ou expirado"));
    }
    return res.status(200).json({
      message: "Digite uma nova senha:",
    });
  });
};

const forgotPassword = (req: Request, res: Response, next: NextFunction) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    return next(new HttpException(400, String(validationErrors.array()[0])));
  }
  // Primeiro acha o usuário
  User.findOne({ email: req.body.email }, (err: Error, foundUser: UserI) => {
    if (err) {
      return next(
        new HttpException(
          500,
          "Ocorreu um erro ao encontrar o usuário cadastrado."
        )
      );
    }
    if (!foundUser) {
      return next(new HttpException(400, "Usuário não encontrado."));
    }
    // Se estiver tudo certo cria um novo token e manda um novo email
    const token = crypto.randomBytes(16).toString("hex");

    Token.create(
      { _userId: foundUser._id, token, passwordReset: true },
      (error, newToken) => {
        if (error) {
          return next(new HttpException(500, "Erro ao criar o token."));
        }
        // Envia o email de verificação
        const transporter = nodemailer.createTransport(
          nodemailerSendgrid({
            apiKey:
              process.env.SENDGRID_API_KEY ||
              "Crie sua API no sendgrid e inclua no aquivo .env!",
          })
        );

        const mailOptions = {
          from: process.env.SENDGRID_EMAIL,
          to: foundUser.email,
          subject: "Seu token de recuperação de senha na 5Pots",
          text: `Olá,
          Para redefinir sua senha clique no link abaixo:
          ${process.env.URL}/auth/reset?token=${newToken.token}`,
        };

        console.log(mailOptions);
        transporter.sendMail(mailOptions, (erro) => {
          if (erro) {
            return next(new HttpException(500, "Erro ao enviar o email"));
          }
          return res.status(200).json({
            message: `Um email de verificação foi enviado para ${foundUser.username}.`,
          });
        });
      }
    );
  });
};

// Rota para atualizar a senha do usuário
const updatePassword = (req: Request, res: Response, next: NextFunction) => {
  const { token } = req.params;
  const { password } = req.body;
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    return next(new HttpException(400, String(validationErrors.array()[0])));
  }
  Token.findOne({ token }, (err: Error, foundToken: TokenI) => {
    if (err || !foundToken || !foundToken.passwordReset) {
      return next(new HttpException(400, "Token inválido ou expirado"));
    }

    User.findOne(
      { _id: foundToken._userId },
      (error: Error, foundUser: UserI) => {
        const salt = bcrypt.genSaltSync(12);
        const hash = bcrypt.hashSync(password, salt);

        foundUser.salt = salt;
        foundUser.hash = hash;

        // Deleta o token criado
        Token.deleteOne({ token })
          .then(() => {
            // E salva o usuário
            foundUser.save((e) => {
              if (e) {
                return next(
                  new HttpException(
                    500,
                    "Erro ao atualizar dados do usuário. Nenhuma mudança foi feita na sua conta."
                  )
                );
              }
              return res.status(200).json({
                message: `Sua senha foi alterada com sucesso.`,
              });
            });
          })
          .catch((erro: Error) => {
            if (erro) {
              return next(new HttpException(500, "Erro ao deletar o Token."));
            }
          });
      }
    );
  });
};

const forgotUsername = (req: Request, res: Response, next: NextFunction) => {
  const { email } = req.body;
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    return next(new HttpException(400, String(validationErrors.array()[0])));
  }

  User.find({ email }).then((user) => {
    if (!user) {
      return next(
        new HttpException(401, "Nenhum usuário cadastrado com esse mail")
      );
    }

    // Verifica o tipo de cadastro da pessoa
    const hasUsername = user.filter((userObj) => userObj.username);
    const hasGoogle = user.filter((userObj) => userObj.googleID);
    const hasFacebook = user.filter((userObj) => userObj.facebookID);

    const transporter = nodemailer.createTransport(
      nodemailerSendgrid({
        apiKey:
          process.env.SENDGRID_API_KEY ||
          "Crie sua API no sendgrid e inclua no aquivo .env!",
      })
    );

    // Monta email com os tipo de cadastros com esse email
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
        process.env.SENDGRID_EMAIL ||
        "Hey! crie um dev.js na pasta config/keys com suas chaves",
      to: user[0].email,
      subject: "Seu usuário cadastrado na 5pots",
      text: `Olá,
Aqui vai seus cadastros na 5pots:

${mailBody}

Se você não pediu para receber um email com seu usuário, só ignore esse email, sua senha está protegida :)`,
    };

    // Manda o email
    transporter.sendMail(mailOptions, (erro) => {
      if (erro) {
        return next(new HttpException(401, "Erro ao enviar o e-mail."));
      }
      return res.status(200).json({
        msg: `Um email de verificação foi enviado para ${user[0].username}.`,
      });
    });
  });
};

const googleCallback = (req: Request, res: Response, next: NextFunction) => {
  if (req.user) {
    const jwt = issueJWT(req.user as UserI);
    res
      .cookie("x-auth-token", jwt, { maxAge: 60000000 })
      .redirect(`${process.env.FRONT_URL}/?auth=google`);
  } else {
    next(new HttpException(401, "Erro ao realizar login com o Google."));
  }
};

const facebookCallback = (req: Request, res: Response, next: NextFunction) => {
  if (req.user) {
    const jwt = issueJWT(req.user as UserI);
    res
      .cookie("x-auth-token", jwt, { maxAge: 60000000 })
      .redirect(`${process.env.FRONT_URL}/?auth=facebook`);
  } else {
    next(new HttpException(401, "Erro ao realizar login com o Facebook."));
  }
};

export {
  login,
  register,
  refresh,
  forgotPassword,
  forgotUsername,
  isTokenValid,
  updatePassword,
  googleCallback,
  facebookCallback,
};
