/* eslint-disable no-unused-vars */
import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { AiFillGoogleSquare, AiFillFacebook } from "react-icons/ai";
import { MdNavigateNext } from "react-icons/md";

import Typography from "../../atoms/Typography";
import TextField from "../../atoms/TextField";
import Button from "../../atoms/Button";

import api from "../../../services/api";
import AuthContext from "../../../contexts/AuthContext";

const FormRegister = () => {
  const { register, handleSubmit } = useForm();
  const [usernameText, setUsernameText] = useState("");
  const { setUser } = useContext(AuthContext);

  const onSubmit = async (data) => {
    const { username, password, confirm, email, displayName } = data;
    // Usa o objeto da form ou adiciona o username como displayName
    const newUser = displayName
      ? data
      : { username, password, confirm, email, displayName: username };

    const res = await api.post("/auth/register", newUser);

    if (res.status === 200) {
      setUser(res.data);
    }

    // FEEDBACK DO USUÁRIO
  };
  return (
    <div className=" auth-page__form">
      <Typography
        variant="h2"
        component="h1"
        className="auth-page__form__title"
      >
        Registrar
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          name="username"
          label="Nome de Usuário"
          type="text"
          icon="MdPerson"
          required
          ref={register}
          onChange={(e) => setUsernameText(e.target.value)}
        />
        <TextField
          name="password"
          label="Senha"
          type="password"
          icon="MdLock"
          required
          ref={register}
        />
        <TextField
          name="confirm"
          label="Confirme sua senha"
          type="password"
          icon="MdLockOutline"
          required
          ref={register}
        />
        <TextField
          name="email"
          label="E-mail (Não é obrigatório)"
          type="email"
          icon="MdEmail"
          placeholder="Só pra recuperar senha um dia"
          ref={register}
        />
        <TextField
          name="displayName"
          label="Nome de Exibição"
          type="text"
          icon="MdInsertEmoticon"
          placeholder={usernameText || `Pode ser seu nick no LoL`}
          ref={register}
        />
        <div className="auth-page__cta">
          <div>
            <Typography variant="p" component="p">
              Ou você pode se registrar com:
            </Typography>
            <a href="/api/auth/google">
              <AiFillGoogleSquare className="auth-page__cta__icon auth-page__cta__icon--google" />
            </a>
            <a href="/api/auth/facebook">
              <AiFillFacebook className="auth-page__cta__icon auth-page__cta__icon--facebook" />
            </a>
            {/* <AiFillTwitterSquare className="auth-page__cta__icon auth-page__cta__icon--twitter" /> */}
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
