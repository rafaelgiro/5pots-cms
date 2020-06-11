/* eslint-disable no-unused-vars */
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { useParams, Link } from "react-router-dom";
import { MdNavigateNext } from "react-icons/md";
import ReCAPTCHA from "react-google-recaptcha";

import Typography from "../../atoms/Typography";
import TextField from "../../atoms/TextField";
import Button from "../../atoms/Button";

import api from "../../../services/api";
import UIContext from "../../../contexts/UIContext";

import { emailValidation } from "../../../constants/formValidation";

const FormForgot = () => {
  const { register, handleSubmit, errors } = useForm();
  const { credential } = useParams();
  const recaptchaRef = React.useRef();
  const { dispatch } = useContext(UIContext);

  const title = credential === "password" ? "MINHA SENHA" : "MEU USUÁRIO";
  const linkText = credential === "password" ? "meu usuário" : "minha senha";
  const linkTo =
    credential === "password"
      ? "/auth/forgot/username"
      : "/auth/forgot/password";

  const onSubmit = async (data) => {
    await recaptchaRef.current.executeAsync();

    api
      .post(`/auth/forgot/${credential}`, data)
      .then((res) => {
        dispatch({
          type: "SHOW_SNACKBAR",
          snackbar: {
            msg: "Um email foi enviado para o endereço informado.",
            variant: "success",
          },
        });
      })
      .catch((err) => {
        dispatch({
          type: "SHOW_SNACKBAR",
          snackbar: {
            msg: err.response.data.msg,
            variant: "error",
          },
        });
      });
  };

  return (
    <div className=" auth-page__form">
      <Typography
        variant="h2"
        component="h1"
        className="auth-page__form__title"
      >
        Esqueci
      </Typography>
      <Typography
        className="auth-page__form__sub-title"
        component="h2"
        variant="h3"
      >
        {title}
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          name="email"
          label="E-mail"
          type="email"
          icon="MdEmail"
          ref={register(emailValidation)}
          errors={errors}
          required
        />
        <ReCAPTCHA
          ref={recaptchaRef}
          size="invisible"
          sitekey={process.env.REACT_APP_RECAPTCHA}
        />
        <div className="auth-page__recover-links">
          <Link to={linkTo}>
            <Typography variant="sub" component="span">
              {`Não pera, nas verdade esqueci ${linkText}.`}
            </Typography>
          </Link>
        </div>
        <div className="auth-page__cta">
          <Button
            type="submit"
            variant="icon"
            className="auth-page__cta__btn auth-page__cta__btn--forgot"
          >
            <MdNavigateNext />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default FormForgot;
