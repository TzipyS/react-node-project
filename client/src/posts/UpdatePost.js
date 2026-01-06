import React, { useState } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { updatePost as apiUpdatePost } from "./ApiPosts";
import CreateIcon from '@mui/icons-material/Create';



export default function UpdatePostDialog({ post, posts, setPosts  }) {
    const [open, setOpen] = useState(false);

    const [formValues, setFormValues] = useState({
        title: post.title || "",
        body : post.body || ""
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
        const updatedPost = {
            ...post,
            title: formValues.title,
            body: formValues.body
        }
        // עדכון ה-state
        const updatedPosts = posts.map((p) => {
            if (p._id === post._id) return updatedPost;
            else return p;
        })
        setPosts (updatedPosts);

        // עדכון לשרת
        try {
            await apiUpdatePost(updatedPost)
        } catch (error) {
            console.error("Error updating post:", error);
            setPosts (posts);
        }
        handleClose()
    }

    return (
        <>
            <Button variant="outlined" onClick={handleClickOpen}>
                <CreateIcon />
                Update
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Update Post</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Update the details of your post
                    </DialogContentText>
                    <form onSubmit={handleSubmit} id={`update-form-${post._id}`}>
                        <TextField
                            autoFocus
                            margin="dense"
                            name="title"
                            label="Title"
                            fullWidth
                            value={formValues.title}
                            onChange={handleChange}
                            required   
                            helperText="This field is required"
                        />
                        <TextField
                            margin="dense"
                            name="body"
                            label="Body"
                            fullWidth
                            value={formValues.body}
                            onChange={handleChange}
                            required   
                            helperText="This field is required"
                        />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit" form={`update-form-${post._id}`}>
                        Update
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}