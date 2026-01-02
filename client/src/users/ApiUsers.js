import Axios from "axios";


export const updateUser = (user) => {
  return Axios.put("http://localhost:4500/api/users", user);
};

export const fetchUser = () => {
  return Axios.get("http://localhost:4500/api/users");
};

export const createUser = (name, username, email, address, phone) => {
  return Axios.post("http://localhost:4500/api/users", { name, username, email, address, phone });
};

export const deleteUser = (id) => {
  return   Axios.delete("http://localhost:4500/api/users", { data: { _id: id } });
};
