export default function success(response, token = response.data.token) {
  const { username } = response.data.user ? response.data.user : response.data;
  localStorage.token = token;
  return {
    newUserState: {
      user: username,
      token: token,
      isAuthenticated: true,
    },
    messages: [`Hello ${username}`],
  };
}
