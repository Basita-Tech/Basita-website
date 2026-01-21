import SEO from "../SEO";
import LoginForm from "./LoginForm";
const LoginPage = () => {
  return (
    <>
      <SEO
        title="Login | Satfera"
        description="Login to your Satfera account."
        path="/login"
      />
      <LoginForm />;
    </>
  );
};
export default LoginPage;
