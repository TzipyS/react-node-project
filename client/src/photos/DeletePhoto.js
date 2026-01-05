import {deletePhoto as apiDeletePhoto} from "./ApiPhotos";

const deletePhoto = async ({id, photos, setPhotos}) => {
        const originalPhotos = [...photos];

        setPhotos(photos.filter(t => t._id !== id));
        try {
            await apiDeletePhoto(id);
        } catch (error) {
            console.error("Error deleting photo:", error);
            setPhotos(originalPhotos);
        }
    };

export default deletePhoto;

