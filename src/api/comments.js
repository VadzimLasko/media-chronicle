import axios from "@/api/axios.js";

const getComments = (slug) => {
    return axios.get(`/articles/${slug}/comments`).then((response) => {
      return response.data.comments;
    });
  };

const addComments = (slug, commentInput) => {
  return axios.post(`/articles/${slug}/comments`, {comment:  {body: commentInput}}).then((response) => {
    return response.data.comment;
  });
};

const deleteComment = (slug, idComment) => {
  return axios.delete(`/articles/${slug}/comments/${idComment}`)
};


export default { getComments, addComments, deleteComment }

