import SEO from "../SEO";
import LoginForm from "./LoginForm";
const LoginPage = () => {
  return (
    <>
      <SEO
        title="Login | Satfera"
        description="Login to your Satfera account."
        noIndex
      />
      <LoginForm />;
    </>
  );
};
export default LoginPage;
