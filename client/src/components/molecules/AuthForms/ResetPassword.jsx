import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { MdNavigateNext } from "react-icons/md";
import ReCAPTCHA from "react-google-recaptcha";

import Typography from "../../atoms/Typography";
import TextField from "../../atoms/TextField";
import Button from "../../atoms/Button";

import { passwordValidation } from "../../../constants/formValidation";

const FormReset = () => {
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState(null);
  const [status, setStatus] = useState({
    status: 0,
    msg: "Processando requisição",
  });
  const { credential } = useParams();
  const { register, handleSubmit, watch, errors } = useForm();
  const recaptchaRef = React.useRef();
  const confirmValidation = {
    minLength: {
      value: 3,
      message: "Hey, a senha precisa ter no mínimo 3 caracteres.",
    },
    required: "Confirme sua senha.",
    validate: (value) =>
      value === watch("password") || "As senhas informadas não são iguais",
  };

  useEffect(() => {
    axios
      .get(`/api/auth/confirmation/validate/${credential}`)
      .then((res) => {
        setError(false);
        setStatus({ status: res.status, msg: res.data.msg });
      })
      .catch((err) => {
        setError(true);
        setStatus({ status: err.response.status, msg: err.response.data.msg });
      });
  }, [credential]);

  const onSubmit = async (data) => {
    await recaptchaRef.current.executeAsync();

    axios
      .post(`/api/auth/forgot/${credential}`, data)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function renderContent() {
    switch (status.status) {
      case 0:
        return <div />;
      case 200:
        return (
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              name="password"
              label="Nova senha"
              type="password"
              icon="MdLock"
              ref={register(passwordValidation)}
              errors={errors}
              required
            />
            <TextField
              name="confirmation"
              label="Confirme sua senha"
              type="password"
              icon="MdLockOutline"
              ref={register(confirmValidation)}
              errors={errors}
              required
            />
            <ReCAPTCHA
              ref={recaptchaRef}
              size="invisible"
              sitekey={process.env.REACT_APP_RECAPTCHA}
            />
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
        );
      default:
        return (
          <div>
            <Link to="/auth/forgot/password">
              <Typography component="p" variant="p">
                Hey, seu token não é mais válido :(
              </Typography>

              <Typography component="p" variant="p">
                Clique aqui para gerar um novo token.
              </Typography>
            </Link>
          </div>
        );
    }
  }

  return (
    <div className=" auth-page__form">
      <Typography
        variant="h2"
        component="h1"
        className="auth-page__form__title"
      >
        CRIAR
      </Typography>
      <Typography
        className="auth-page__form__sub-title"
        component="h2"
        variant="h3"
      >
        NOVA SENHA
      </Typography>
      {renderContent()}
    </div>
  );
};

export default FormReset;
