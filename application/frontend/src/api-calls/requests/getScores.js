import axios from "axios";
import headerConfig from "../helpers/headerConfig";

export default async function getScores() {
  try {
    const response = await axios.get("/api/scores", headerConfig());
    return response.data;
  } catch (error) {
    return error.data;
  }
}
