import React, { Fragment, useContext } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalContext";
import { logout } from "../../api-calls/requests/logout";
import { initialState } from "../../context/initialState";

export default function Header() {
  const { userState, setUserState, setAlertMessages } = useContext(
    GlobalContext
  );

  async function handleLogout(userState) {
    const response = await logout(userState.token);
    if (response.success) {
      localStorage.removeItem("token");
      setUserState(initialState);
    }

    setAlertMessages(response.messages);
  }

  const userLoggedIn = (
    <li>
      <button
        onClick={() => {
          handleLogout(userState);
        }}
        className="nav-link btn btn-info btn-sm text-light"
      >
        Logout
      </button>
    </li>
  );

  const userLoggedOut = (
    <Fragment>
      <li>
        <Link to="/login">Login</Link>
      </li>
      <li>
        <Link to="/register">Register</Link>
      </li>
    </Fragment>
  );
  return (
    <header>
      <div className="user-name">
        {userState.user ? `Hello ${userState.user}` : ""}
      </div>
      <nav>
        <ul>
          <li>
            <Link to="/">Play</Link>
          </li>
          <li>
            <Link to="/leaderboard">Leaderboard</Link>
          </li>
          {userState.user ? userLoggedIn : userLoggedOut}
        </ul>
      </nav>
    </header>
  );
}
