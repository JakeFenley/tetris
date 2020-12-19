import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalContext";
import { userLogin } from "../../api-calls/requests/userLogin";

export default function Login() {
  const { userState, setUserState, setAlertMessages } = useContext(
    GlobalContext
  );

  const authLogin = async (e) => {
    e.preventDefault();
    const { email, password } = e.target;

    if (email.value && password.value) {
      const response = await userLogin(email.value, password.value);
      setUserState(response.newUserState);
      setAlertMessages(response.messages);
    } else {
      setAlertMessages(["Please Enter a Username and Password"]);
    }
  };

  if (userState.isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <form onSubmit={authLogin}>
      <label htmlFor="email">Email</label>
      <input
        type="email"
        id="email"
        name="email"
        placeholder="Email*"
        autoComplete="true"
      />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        id="password"
        name="password"
        placeholder="Password*"
        autoComplete="current-password"
      />
      <button type="submit">Login</button>
    </form>
  );
}
