import axios from "axios";
import success from "../helpers/loginSuccess";
import error from "../helpers/loginError";
import headerConfig from "../helpers/headerConfig";

export default async function postScore(token, score) {
  const body = JSON.stringify({ score });
  try {
    const response = await axios.post(
      "/api/scores/",
      body,
      headerConfig(token)
    );
    return success(response, token);
  } catch (err) {
    return error(err);
  }
}
