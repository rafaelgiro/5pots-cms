/* eslint-disable react/jsx-one-expression-per-line */
import { useContext } from "react";
import clsx from "clsx";
import { useRouter } from "next/router";
import Link from "next/link";
import { AiFillGoogleSquare, AiFillFacebook } from "react-icons/ai";
import { MdNavigateNext } from "react-icons/md";
import { useForm } from "react-hook-form";
import ReCAPTCHA from "react-google-recaptcha";

import Typography from "../../atoms/Typography";
import TextField from "../../atoms/TextField";
import Button from "../../atoms/Button";

import api from "../../../core/services/api";
import AuthContext from "../../../core/contexts/AuthContext";
import UIContext from "../../../core/contexts/UIContext";

import {
  usernameValidation,
  passwordValidation,
} from "../../../core/constants/formValidation";

import styles from "../../templates/AuthPage/styles.module.scss";

const FormLogin = () => {
  const { register, handleSubmit, errors } = useForm();
  const { setUser } = useContext(AuthContext);
  const { dispatch } = useContext(UIContext);
  const recaptchaRef = React.useRef();
  const router = useRouter();

  const onSubmit = async (data) => {
    await recaptchaRef.current.executeAsync();

    api
      .post("/auth/login", data)
      .then((res) => {
        setUser(res.data);
        dispatch({
          type: "SHOW_SNACKBAR",
          snackbar: {
            msg: "Logado com sucesso.",
            variant: "success",
          },
        });
        router.push("/");
      })
      .catch(() => {
        dispatch({
          type: "SHOW_SNACKBAR",
          snackbar: {
            msg: "Usuário ou senha incorretos.",
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
          sitekey={process.env.NEXT_PUBLIC_RECAPTCHA}
        />
        <div className={styles["auth-page__recover-links"]}>
          <Link href="/auth/forgot/username">
            <a>
              <Typography variant="sub" component="span">
                Tenho usuário?
              </Typography>
            </a>
          </Link>

          <Typography variant="sub" component="span">
            {" "}
            &#8226;{" "}
          </Typography>

          <Link href="/auth/forgot/password">
            <a>
              <Typography variant="sub" component="span">
                Esqueci minha senha
              </Typography>
            </a>
          </Link>
        </div>

        <div className={styles["auth-page__cta"]}>
          <div>
            <Typography variant="p" component="p">
              Ou você pode entrar com:
            </Typography>
            <a href="/api/auth/google">
              <AiFillGoogleSquare
                className={clsx(
                  styles["auth-page__cta__icon"],
                  styles["auth-page__cta__icon--google"]
                )}
              />
            </a>
            <a href="/api/auth/facebook">
              <AiFillFacebook
                className={clsx(
                  styles["auth-page__cta__icon"],
                  styles["auth-page__cta__icon--facebook"]
                )}
              />
            </a>
            {/* <AiFillTwitterSquare className="auth-page__cta__icon auth-page__cta__icon--twitter" /> */}
          </div>
          <div>
            <Button
              type="submit"
              variant="icon"
              className={styles["auth-page__cta__btn"]}
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
