import Axios from "axios";

export const fetchPhotos = () => {
  return Axios.get("http://localhost:4500/api/photos");
};


export const updatePhotos = (photo) => {
  return Axios.put("http://localhost:4500/api/photos", photo);
};


export const createPhoto = (title, imageUrl) => {
  return Axios.post("http://localhost:4500/api/photos", { title, imageUrl});
};

export const deletePhoto = (id) => {
  return   Axios.delete("http://localhost:4500/api/photos", { data: { _id: id } });
};
