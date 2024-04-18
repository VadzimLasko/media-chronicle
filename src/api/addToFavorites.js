import axios from "@/api/axios.js";

const getUrl = (slug) => {
  return `/articles/${slug}/favorite`;
};

const addToFavorites = (slug) => {
  const url = getUrl(slug);
  return axios.post(url).then((response) => {
    return response.data.article;
  });
};

const removeFromFavorites = (slug) => {
  const url = getUrl(slug);
  return axios.delete(url).then((response) => {
    return response.data.article;
  });
};

export default { addToFavorites, removeFromFavorites };
