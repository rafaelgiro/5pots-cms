import { useState, useEffect, useRef, useContext } from "react";
import clsx from "clsx";
import { useRouter } from "next/router";
import Link from "next/link";
import axios from "axios";

import { useForm } from "react-hook-form";
import { MdNavigateNext } from "react-icons/md";
import ReCAPTCHA from "react-google-recaptcha";

import Typography from "../../atoms/Typography";
import TextField from "../../atoms/TextField";
import Button from "../../atoms/Button";

import { passwordValidation } from "../../../core/constants/formValidation";
import UIContext from "../../../core/contexts/UIContext";

import styles from "../../templates/AuthPage/styles.module.scss";

const FormReset = () => {
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(0);
  const { register, handleSubmit, watch, errors } = useForm();
  const recaptchaRef = useRef();
  const { dispatch } = useContext(UIContext);
  const router = useRouter();
  const { token } = router.query;

  const confirmValidation = {
    minLength: {
      value: 6,
      message: "Hey, a senha precisa ter no mínimo 6 caracteres.",
    },
    required: "Confirme sua senha.",
    validate: (value) =>
      value === watch("password") || "As senhas informadas não são iguais",
  };

  useEffect(() => {
    axios
      .get(`/api/auth/confirmation/validate/${token}`)
      .then((res) => {
        setStatus(res.status);
      })
      .catch(() => {
        setError(true);
        dispatch({
          type: "SHOW_SNACKBAR",
          snackbar: {
            msg: "O token informado não é mais válido :(",
            variant: "error",
          },
        });
      });
  }, [token, dispatch]);

  const onSubmit = async (data) => {
    // await recaptchaRef.current.executeAsync();
    // axios
    //   .post(`/api/auth/forgot/${token}`, data)
    //   .then(() => {
    //     dispatch({
    //       type: "SHOW_SNACKBAR",
    //       snackbar: {
    //         msg: "Senha alterada com sucesso.",
    //         variant: "success",
    //       },
    //     });
    //     router.push("/auth/login");
    //   })
    //   .catch((err) => {
    //     dispatch({
    //       type: "SHOW_SNACKBAR",
    //       snackbar: {
    //         msg: err.response.data.msg,
    //         variant: "error",
    //       },
    //     });
    //   });
  };

  function renderContent() {
    switch (status) {
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
              sitekey={process.env.NEXT_PUBLIC_RECAPTCHA}
            />
            <div className="auth-page__cta">
              <Button
                type="submit"
                variant="icon"
                className={clsx(
                  styles["auth-page__cta__btn"],
                  styles["auth-page__cta__btn--forgot"]
                )}
              >
                <MdNavigateNext />
              </Button>
            </div>
          </form>
        );
      default:
        return (
          <div>
            <Link href="/auth/forgot/password">
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
    <div className={styles["auth-page__form"]}>
      <Typography
        variant="h2"
        component="h1"
        className={styles["auth-page__form__title"]}
      >
        CRIAR
      </Typography>
      <Typography
        className={styles["auth-page__form__sub-title"]}
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
