import axios from "axios";
import headerConfig from "../helpers/headerConfig";

export const logout = async (token) => {
  try {
    await axios.post("/api/auth/logout", null, headerConfig(token));
    return { success: true, messages: [] };
  } catch (err) {
    return { success: false, messages: [err.response.data.detail] };
  }
};
