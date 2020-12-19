import { initialState } from "../../context/initialState";

export default function error(err) {
  localStorage.removeItem("token");
  const errors = err.response.data;
  let messages = [];

  if (errors.username) messages.push(errors.username);
  if (errors.email) messages.push(errors.email);
  if (errors.detail) messages.push(errors.detail);
  if (errors.non_field_errors) messages.push(errors.non_field_errors);

  return {
    newUserState: initialState,
    messages: messages,
  };
}
