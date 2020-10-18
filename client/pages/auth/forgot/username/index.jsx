import AuthPage from "../../../../components/templates/AuthPage";
import FormForgot from "../../../../components/molecules/AuthForms/Forgot";

const ForgotUsernamePage = () => {
  return (
    <AuthPage>
      <FormForgot credential="username" />
    </AuthPage>
  );
};

export default ForgotUsernamePage;
