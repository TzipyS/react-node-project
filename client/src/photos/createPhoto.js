import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { createTodo as apiCreateTodo } from './ApiTodos';

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
        const tags = formJson.tags ? formJson.tags.split(",") : [];
        const completed = formJson.completed || "false";
        console.log(title, tags, completed);
        //קריאה לשרת פה
        apiCreateTodo(title, tags, completed).then((response) => {
            console.log("Todo created successfully:", response.data);
        }
        ).catch((error) => {
            console.error("Error creating todo:", error);
        });
        handleClose();
    }

    return (
        <React.Fragment>
            <Button variant="contained" onClick={handleClickOpen}>
                Create New Todo
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>creation</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Enter the details for TODO creativity
                    </DialogContentText>
                    <form onSubmit={handleSubmit} id="subscription-form">
                        <div>
                            <TextField label="Title" name="title" id="outlined-size-small" fullWidth margin="dense"/>
                            <TextField label="Tags" name="tags" id="outlined-size-small" />
                            <TextField label="Completed" name="completed" id="outlined-size-small" />
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
