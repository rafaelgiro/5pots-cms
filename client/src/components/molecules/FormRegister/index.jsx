/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import {
  AiFillGoogleSquare,
  AiFillFacebook,
  AiFillTwitterSquare
} from "react-icons/ai";
import { MdNavigateNext } from "react-icons/md";

import Typography from "../../atoms/Typography";
import TextField from "../../atoms/TextField";
import Button from "../../atoms/Button";

const FormRegister = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  return (
    <div className=" auth-page__form">
      <Typography
        variant="h2"
        component="h1"
        className="auth-page__form__title"
      >
        Registrar
      </Typography>
      <form>
        <TextField
          id="username"
          label="Nome de Usuário"
          type="text"
          icon="MdPerson"
          onChange={setUsername}
          required
        />
        <TextField
          id="password"
          label="Senha"
          type="password"
          icon="MdLock"
          onChange={setPassword}
          required
        />
        <TextField
          id="email"
          label="E-mail (Não é obrigatório)"
          type="email"
          icon="MdEmail"
          placeholder="Só pra recuperar senha um dia :B"
          onChange={setEmail}
        />
        <div className="auth-page__cta">
          <div>
            <Typography variant="p" component="p">
              Ou você pode se registrar com:
            </Typography>
            <AiFillGoogleSquare className="auth-page__cta__icon auth-page__cta__icon--google" />
            <AiFillFacebook className="auth-page__cta__icon auth-page__cta__icon--facebook" />
            <AiFillTwitterSquare className="auth-page__cta__icon auth-page__cta__icon--twitter" />
          </div>
          <div>
            <Button
              type="submit"
              variant="icon"
              className="auth-page__cta__btn"
            >
              <MdNavigateNext />
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FormRegister;
