import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Header from "./layouts/Header";
import Login from "./accounts/Login";
import Register from "./accounts/Register";
import Leaderboard from "./leaderboard/Leaderboard";
import "./styles.scss";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext";
import { getUser } from "../api-calls/requests/getUser";
import { initialState, initialErrorState } from "../context/initialState";
import { Provider as AlertProvider, positions } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import Alerts from "./layouts/Alerts";
import Game from "./game/Game";

export default function App() {
  const [userState, setUserState] = useState(initialState);
  const [alertMessages, setAlertMessages] = useState(initialErrorState);

  const options = {
    position: positions.TOP_CENTER,
    timeout: 5000,
  };

  useEffect(async () => {
    if (localStorage.token && !userState.isAuthenticated) {
      const response = await getUser(localStorage.token);
      setUserState(response.newUserState);
    }
  }, [userState.user]);

  return (
    <Router>
      <GlobalContext.Provider
        value={{ userState, setUserState, alertMessages, setAlertMessages }}
      >
        <AlertProvider template={AlertTemplate} {...options}>
          <Alerts />
          <div className="wrapper">
            <Header />
            <Switch>
              <Route exact path="/" component={Game} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/leaderboard" component={Leaderboard} />
            </Switch>
          </div>
        </AlertProvider>
      </GlobalContext.Provider>
    </Router>
  );
}

ReactDOM.render(<App />, document.getElementById("app"));
