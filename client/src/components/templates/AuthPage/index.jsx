import React from "react";
import { useParams } from "react-router-dom";

import FormLogin from "../../molecules/AuthForms/Login";
import FormRegister from "../../molecules/AuthForms/Register";
import FormForgot from "../../molecules/AuthForms/Forgot";
import FormReset from "../../molecules/AuthForms/ResetPassword";

const loginGallery = [
  "https://i.imgur.com/M9dYyaU.jpg",
  "https://i.imgur.com/NKQhPdG.jpg",
  "https://i.imgur.com/TpDGGtp.jpg",
  "https://i.imgur.com/adyjByb.jpg",
  "https://i.imgur.com/H8dbHe4.jpg",
  "https://i.imgur.com/iX9pyAR.jpg",
];

const AuthPage = () => {
  const { action } = useParams();

  const renderForm = () => {
    switch (action) {
      case "login":
        return <FormLogin />;
      case "register":
        return <FormRegister />;
      case "forgot":
        return <FormForgot />;
      case "reset":
        return <FormReset />;
      default:
        return <div />;
    }
  };

  return (
    <div className="auth-page">
      <h2 className="auth-page__sion-te-amo">Sion te amo</h2>
      {renderForm()}
      <img
        src={loginGallery[Math.ceil(Math.random() * loginGallery.length) - 1]}
        alt="Imagem de Login"
        className="auth-page__right-image"
      />
    </div>
  );
};

export default AuthPage;
