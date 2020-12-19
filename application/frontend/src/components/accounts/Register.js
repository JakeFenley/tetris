import React, { useContext } from "react";
import { Redirect } from "react-router";
import registerUser from "../../api-calls/requests/registerUser";
import { GlobalContext } from "../../context/GlobalContext";
export default function Register() {
  const { userState, setUserState, setAlertMessages } = useContext(
    GlobalContext
  );

  const authRegister = async (e) => {
    e.preventDefault();
    const { username, email, password, password2 } = e.target;

    if (
      !username.value ||
      !email.value ||
      !password.value ||
      !password2.value
    ) {
      setAlertMessages(["Fields must not be left blank"]);
      return;
    }

    if (password.value === password2.value && password.value.length > 7) {
      const response = await registerUser(
        username.value,
        email.value,
        password.value
      );
      setUserState(response.newUserState);

      setAlertMessages(response.messages);
    } else {
      setAlertMessages([
        "Passwords must match and be at least 8 characters long",
      ]);
    }
  };

  if (userState.isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <form onSubmit={authRegister}>
      <label htmlFor="username">Username</label>
      <input
        type="text"
        id="username"
        name="username"
        placeholder="Username*"
        autoComplete="off"
      ></input>
      <label htmlFor="email">Email</label>
      <input
        type="email"
        id="email"
        name="email"
        placeholder="Email*"
        autoComplete="email"
      ></input>
      <label htmlFor="password">Password</label>
      <input
        type="password"
        id="password"
        name="password"
        placeholder="Password*"
        autoComplete="new-password"
      ></input>
      <label htmlFor="password2">Confirm Password</label>
      <input
        type="password"
        id="password2"
        name="password2"
        placeholder="Password*"
        autoComplete="new-password"
      ></input>

      <button type="submit">Sign Up</button>
    </form>
  );
}
