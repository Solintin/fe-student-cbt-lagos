import axios from "axios";

const FetchClient = () => {
  const defaultOptions = {
    baseURL: 'https://oacss-cbt-be.onrender.com/api',
  };

  // Create instance
  let instance = axios.create(defaultOptions);

  return instance;
};

export default FetchClient();
