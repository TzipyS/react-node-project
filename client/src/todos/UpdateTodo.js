import React, { useState } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { updateTodo as apiUpdateTodo } from "./ApiTodos";
import CreateIcon from '@mui/icons-material/Create';



export default function UpdateTodoDialog({ todo, todos, setTodos }) {
    const [open, setOpen] = useState(false);

    const [formValues, setFormValues] = useState({
        title: todo.title || "",
        tags: todo.tags ? todo.tags.join(",") : "",
        completed: todo.completed || false
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
        const updatedTodo = {
            ...todo,
            title: formValues.title,
            tags: formValues.tags.split(",").map(tag => tag.trim()),
            completed: formValues.completed === "true" || formValues.completed === true
        }
        const updatedTodos = todos.map((t) => {
            if (t._id === todo._id) return updatedTodo;
            else return t;
        })
        setTodos(updatedTodos);

        try {
            await apiUpdateTodo(updatedTodo)
        } catch (error) {
            console.error("Error updating todo:", error);
            setTodos(todos);
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
                <DialogTitle>Update Todo</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Update the details of your todo
                    </DialogContentText>
                    <form onSubmit={handleSubmit} id={`update-form-${todo._id}`}>
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
                            name="tags"
                            label="Tags (comma separated)"
                            fullWidth
                            value={formValues.tags}
                            onChange={handleChange}
                        />
                        <TextField
                            margin="dense"
                            name="completed"
                            label="Completed"
                            fullWidth
                            value={formValues.completed.toString()}
                            onChange={handleChange}
                        />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit" form={`update-form-${todo._id}`}>
                        Update
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}