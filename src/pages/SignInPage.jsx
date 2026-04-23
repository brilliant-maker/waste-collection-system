import { useState } from "react";
import { useNavigate } from "react-router";
import useSBAuth from "../hooks/useSBAuth.js";
import Form from "../components/Form.jsx";
import Fieldset from "../components/Fieldset.jsx";
import Legend from "../components/Legend.jsx";
import Label from "../components/Label.jsx";
import EmailInput from "../components/EmailInput.jsx";
import PasswordInput from "../components/PasswordInput.jsx";
import Button from "../components/Button.jsx";
import ErrorText from "../components/ErrorText.jsx";

export default function SignInPage() {

  const navigate = useNavigate();

  const {
    signIn,
    isSigningIn,
    signInError
  } = useSBAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  }
  
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  }

  const handleSignIn = async (event) => {

    event.preventDefault();
    
    await signIn({ email, password });

    navigate("/ward_schedules", { replace:true });
  };

  return (
    <>
      <Form onSubmit={handleSignIn}>
        <Fieldset>
          <Legend className="legend-strong">
            Sign In
          </Legend>
          <Label
            id="email">
            Email:
          </Label>
          <EmailInput
            id="email"
            placeholder="Enter Email"
            required
            value={email}
            onChange={handleEmailChange}/>
          <Label
            id="password">
            Password:
          </Label>
          <PasswordInput
            id="password"
            placeholder="Enter Password"
            required
            value={password}
            onChange={handlePasswordChange}/>
          <Button
            className="button-primary button-medium"
            disabled={isSigningIn}>
            {isSigningIn ? "Signing In..." : "Sign In"}
          </Button>
        </Fieldset>
      </Form>
      {signInError && (
        <ErrorText>{signInError}</ErrorText>
      )}
    </>
  );
}
