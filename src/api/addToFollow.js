import axios from "@/api/axios.js";

const getToFollow = (slug) => {
    return axios.get(`/profiles/${slug}`).then((response) => {
      return response.data.profile;
    });
  };

const getUrl = (slug) => {
    return `/profiles/${slug}/follow`;
};

const addToFollow = (slug) => {
  const url = getUrl(slug);
  return axios.post(url).then((response) => {
    return response.data.profile;
  });
};

const removeFromFollow = (slug) => {
  const url = getUrl(slug);
  return axios.delete(url).then((response) => {
    return response.data.profile;
  });
};

export default { getToFollow, addToFollow, removeFromFollow };