import Axios from "axios";


export const updatePost = (post) => {
  return Axios.put("http://localhost:4500/api/posts", post);
};

export const fetchPosts = () => {
  return Axios.get("http://localhost:4500/api/posts");
};

export const createPost = (title, tags, completed) => {
  return Axios.post("http://localhost:4500/api/posts", { title, tags, completed });
};

export const deletePost = (id) => {
  return   Axios.delete("http://localhost:4500/api/posts", { data: { _id: id } });
};
