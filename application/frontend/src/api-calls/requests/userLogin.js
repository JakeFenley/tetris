import axios from "axios";
import success from "../helpers/loginSuccess";
import error from "../helpers/loginError";
import headerConfig from "../helpers/headerConfig";

export const userLogin = async (email, password) => {
  const body = JSON.stringify({ email, password });

  try {
    const response = await axios.post("/api/auth/login", body, headerConfig());
    return success(response);
  } catch (err) {
    return error(err);
  }
};
