import axios from "axios";

const FetchClient = () => {
  const defaultOptions = {
    baseURL: 'https://cbt-v2-bcpi.onrender.com/api',
  };

  // Create instance
  let instance = axios.create(defaultOptions);

  return instance;
};

export default FetchClient();
