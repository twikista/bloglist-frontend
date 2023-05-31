import axios from "axios";

const baseUrl = "/api/login";

const login = async (loginCredentials) => {
  const response = await axios.post(baseUrl, loginCredentials);
  return response.data;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { login };
