import AuthPage from "../../../../components/templates/AuthPage";
import FormForgot from "../../../../components/molecules/AuthForms/Forgot";

const ForgotPasswordPage = () => {
  return (
    <AuthPage>
      <FormForgot credential="password" />
    </AuthPage>
  );
};

export default ForgotPasswordPage;
