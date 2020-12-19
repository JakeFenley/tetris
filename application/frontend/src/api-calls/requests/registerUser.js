import axios from "axios";
import error from "../helpers/loginError";
import headerConfig from "../helpers/headerConfig";
import success from "../helpers/loginSuccess";

export default async function registerUser(username, email, password) {
  const body = JSON.stringify({ username, email, password });

  try {
    const response = await axios.post(
      "/api/auth/register",
      body,
      headerConfig()
    );
    return success(response);
  } catch (err) {
    return error(err);
  }
}
