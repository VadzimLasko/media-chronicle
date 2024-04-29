// get("/articles/:slug/comments", ctrl.comments.get)
// post("/articles/:slug/comments", auth, ctrl.comments.post)
// del("/articles/:slug/comments/:comment", auth, c

import axios from "@/api/axios.js";

const getComments = (slug) => {
    return axios.get(`/articles/${slug}/comments`).then((response) => {
      return response.data.comments;
    });
  };

const addComments = (slug, commentInput) => {
  return axios.post(`/articles/${slug}/comments`, { comment: commentInput }).then((response) => {
    return response.data.comment;
  });
};

const removeComment = (slug, comment) => {
  return axios.delete(`/articles/${slug}/comments/${comment}`)
};


export default { getComments, addComments, removeComment }