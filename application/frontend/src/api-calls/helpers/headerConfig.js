export default function headerConfig(token = null) {
  let config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (token) config.headers.Authorization = "Token " + token;

  return config;
}
