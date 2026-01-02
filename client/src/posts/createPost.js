import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { createPost as ApicreatePost } from './ApiPosts';

export default function FormDialog() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formJson = Object.fromEntries(formData.entries());
        const title = formJson.title || "";
        const body = formJson.body || "";
        console.log(title, body);

        ApicreatePost(title, body).then((response) => {
            console.log("Post created successfully:", response.data);
        }
        ).catch((error) => {
            console.error("Error creating post:", error);
        });
        handleClose();
    }

    return (
        <React.Fragment>
            <Button variant="outlined" onClick={handleClickOpen}>
                Create Post
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>creation</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Enter the details for TODO creativity
                    </DialogContentText>
                    <form onSubmit={handleSubmit} id="subscription-form">
                        <div>
                            <TextField label="Title" name="title" id="outlined-size-small" />
                            <TextField label="Body" name="body" id="outlined-size-small" />
                        </div>

                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit" form="subscription-form">
                        Create
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
