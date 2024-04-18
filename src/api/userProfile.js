import axios from "@/api/axios.js";

const getUserProfile = (slug) => {
  return axios.get(`/profiles/${slug}`).then((response) => {
    return response.data.profile;
  });
};
export default { getUserProfile };
