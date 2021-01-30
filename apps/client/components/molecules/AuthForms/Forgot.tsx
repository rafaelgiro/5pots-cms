import { useReducer, useRef } from "react";
import clsx from "clsx";
import Link from "next/link";
import { useForm } from "react-hook-form";
import MdNavigateNext from "@meronex/icons/md/MdNavigateNext";
import MdEmail from "@meronex/icons/md/MdEmail";
import ReCAPTCHA from "react-google-recaptcha";

import Typography from "../../atoms/Typography";
import TextField from "../../atoms/TextField";
import Button from "../../atoms/Button";
import styles from "../../templates/AuthPage/styles.module.scss";

import api from "../../../core/services/api";
import { initialState, reducer } from "../../../core/contexts/UIContext";
import { emailValidation } from "../../../core/constants/formValidation";
import { ForgotProps } from "./interfaces";

const FormForgot = (props: ForgotProps) => {
  const { credential } = props;
  const { register, handleSubmit, errors } = useForm();
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [, dispatch] = useReducer(reducer, initialState);

  const title = credential === "password" ? "MINHA SENHA" : "MEU USUÁRIO";
  const linkText = credential === "password" ? "meu usuário" : "minha senha";
  const linkTo =
    credential === "password"
      ? "/auth/forgot/username"
      : "/auth/forgot/password";

  const onSubmit = async (data: Record<string, string>) => {
    await recaptchaRef?.current?.executeAsync();
    api
      .post(`/auth/forgot/${credential}`, data)
      .then(() => {
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
    <div className={styles["auth-page__form"]}>
      <Typography
        variant="h2"
        component="h1"
        className={styles["auth-page__form__title"]}
      >
        Esqueci
      </Typography>
      <Typography
        className={styles["auth-page__form__sub-title"]}
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
          icon={MdEmail}
          ref={register(emailValidation)}
          errors={errors}
          required
        />
        <ReCAPTCHA
          ref={recaptchaRef}
          size="invisible"
          sitekey={process.env.NEXT_PUBLIC_RECAPTCHA as string}
        />
        <div className={styles["auth-page__recover-links"]}>
          <Link href={linkTo}>
            <a>
              <Typography variant="sub" component="span">
                {`Não pera, nas verdade esqueci ${linkText}.`}
              </Typography>
            </a>
          </Link>
        </div>
        <div className={styles["auth-page__cta"]}>
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
    </div>
  );
};

export default FormForgot;
