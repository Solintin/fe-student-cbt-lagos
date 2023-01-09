import axios from "axios";

const FetchClient = () => {
  const defaultOptions = {
    baseURL: process.env.REACT_APP_BACKEND_BASE_URL_PROD,
  };

  // Create instance
  let instance = axios.create(defaultOptions);

  return instance;
};

export default FetchClient();
