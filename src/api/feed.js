import axios from "@/api/axios.js";

const getFeed = (apiUrl) => {
  return axios.get(apiUrl);
};

export default { getFeed };
