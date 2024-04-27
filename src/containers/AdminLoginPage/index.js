// AdminLoginPage.js

import { useState } from "react";
import { Container, Grid, Paper} from "@mui/material";
import SignInForm from "../../components/SignInForm";
import SignUpForm from "../../components/SignUpForm";
import ForgotPasswordForm from "../../components/ForgetPasswordForm";

const AdminLoginPage = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [isSignUp, setIsSignUp] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);

  const handleSignInClick = () => {
    setIsSignIn(true);
    setIsSignUp(false);
    setIsForgotPassword(false);
  };

  const handleSignUpClick = () => {
    setIsSignIn(false);
    setIsSignUp(true);
    setIsForgotPassword(false);
  };

  const handleForgotPasswordClick = () => {
    setIsSignIn(false);
    setIsSignUp(false);
    setIsForgotPassword(true);
  };

  return (
    <Container maxWidth="md">
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ height: "100vh" }}
      >
        <Grid item xs={12} sm={8}>
          <Paper elevation={3} style={{ padding: "20px" }}>
          <img
            className="m-5"
            src="/images/logo.png"
            alt="Logo"
            style={{ display: "block", margin: "auto", marginBottom: "20px" }}
          /> 
            {isSignIn && (
              <SignInForm
                onSignUpClick={handleSignUpClick}
                onForgotPasswordClick={handleForgotPasswordClick}
              />
            )}
            {isSignUp && <SignUpForm onSignInClick={handleSignInClick} />}
            {isForgotPassword && (
              <ForgotPasswordForm onSignInClick={handleSignInClick} />
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AdminLoginPage;
