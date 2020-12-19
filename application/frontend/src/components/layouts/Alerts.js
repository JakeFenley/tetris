import React, { Fragment, useEffect, useContext } from "react";
import { useAlert } from "react-alert";
import { GlobalContext } from "../../context/GlobalContext";

export default function Alerts() {
  const { alertMessages } = useContext(GlobalContext);
  const alert = useAlert();

  useEffect(() => {
    for (let i = 0; i < alertMessages.length; i++) {
      alert.show(alertMessages[i]);
    }
  }, [alertMessages]);

  return <Fragment></Fragment>;
}
