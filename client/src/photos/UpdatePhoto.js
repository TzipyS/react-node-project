import { useState } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { updatePhotos as apiUpdatePhoto } from "./ApiPhotos";



export default function UpdateTodoDialog({ photo, photos, setPhotos }) {
    const [open, setOpen] = useState(false);

    const [formValues, setFormValues] = useState({
        title: photo.title || "",
        imageUrl: photo.imageUrl || ""
    })

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const updatedPhoto = {
            ...photo,
            title: formValues.title,
            imageUrl: formValues.imageUrl
        };

        const updatedPhotos = photos.map((p) => {
            if (p._id === photo._id) return updatedPhoto;
            else return p;
        })
        // setPhotos(updatedPhotos);

        // try {
        //     await apiUpdatePhoto(photo._id, updatedPhoto)
        // } catch (error) {
        //     console.error("Error updating photo:", error);
        //     setPhotos(photos);
        // }

        try {
            const updatedFromServer = await apiUpdatePhoto(photo._id, updatedPhoto);
            const updatedPhotos = photos.map(p =>
                p._id === photo._id ? updatedFromServer : p
            );
            setPhotos(updatedPhotos);
        } catch (error) {
            console.error("Error updating photo:", error);
        }

        handleClose()
    }

    return (
        <>
            <Button variant="outlined" onClick={handleClickOpen}>
                Update
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Update Photo</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Update the details of your photo
                    </DialogContentText>
                    <form onSubmit={handleSubmit} id={`update-form-${photo._id}`}>
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            name="title"
                            label="Title"
                            fullWidth
                            value={formValues.title}
                            onChange={handleChange}
                        />
                        <TextField
                            margin="dense"
                            name="imageUrl"
                            label="ImageUrl"
                            fullWidth
                            value={formValues.imageUrl.toString()}
                            onChange={handleChange}
                        />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit" form={`update-form-${photo._id}`}>
                        Update
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}