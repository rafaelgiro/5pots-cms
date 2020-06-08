/* eslint-disable react/jsx-one-expression-per-line */
import React, { useContext } from "react";
import { AiFillGoogleSquare, AiFillFacebook } from "react-icons/ai";
import { MdNavigateNext } from "react-icons/md";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";

import Typography from "../../atoms/Typography";
import TextField from "../../atoms/TextField";
import Button from "../../atoms/Button";

import api from "../../../services/api";
import AuthContext from "../../../contexts/AuthContext";
import {
  usernameValidation,
  passwordValidation,
} from "../../../constants/formValidation";

const FormLogin = () => {
  const { register, handleSubmit, errors } = useForm();
  const { setUser } = useContext(AuthContext);
  const recaptchaRef = React.useRef();
  const history = useHistory();

  const onSubmit = async (data) => {
    await recaptchaRef.current.executeAsync();

    const res = await api.post("/auth/login", data);

    if (res.status === 200) {
      setUser(res.data);
      history.push("/");
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
        Login
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          name="username"
          label="Nome de Usuário"
          type="text"
          icon="MdPerson"
          required
          errors={errors}
          ref={register(usernameValidation)}
        />
        <TextField
          name="password"
          label="Senha"
          type="password"
          icon="MdLock"
          required
          errors={errors}
          ref={register(passwordValidation)}
        />
        <ReCAPTCHA
          ref={recaptchaRef}
          size="invisible"
          sitekey={process.env.REACT_APP_RECAPTCHA}
        />
        <div className="auth-page__recover-links">
          <Link to="/auth/forgot/username">
            <Typography variant="sub" component="span">
              Tenho usuário?
            </Typography>
          </Link>

          <Typography variant="sub" component="span">
            {" "}
            &#8226;{" "}
          </Typography>

          <Link to="/auth/forgot/password">
            <Typography variant="sub" component="span">
              Esqueci minha senha
            </Typography>
          </Link>
        </div>

        <div className="auth-page__cta">
          <div>
            <Typography variant="p" component="p">
              Ou você pode entrar com:
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

export default FormLogin;
