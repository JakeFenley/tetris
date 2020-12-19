import axios from "axios";
import success from "../helpers/loginSuccess";
import error from "../helpers/loginError";
import headerConfig from "../helpers/headerConfig";

export const getUser = async (token) => {
  try {
    const response = await axios.get("/api/auth/user", headerConfig(token));
    return success(response, token);
  } catch (err) {
    return error(err);
  }
};
