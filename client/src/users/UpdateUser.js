import React, { useState } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { updateUser as apiUpdateUser } from "./ApiUsers";
import CreateIcon from '@mui/icons-material/Create';


export default function UpdateUserDialog({ user, users, setUsers }) {
    const [open, setOpen] = useState(false);
    const [formValues, setFormValues] = useState({
        name : user.name|| "",
        username : user.username  || "",
        email : user.email || "",
        address : user.address || "",
        phone :  user.phone || ""
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
        const updatedUser = {
            ...user,
            name: formValues.name,
            username:formValues.username,
            email:formValues.email ,
            phone: formValues.phone,
            address:formValues.address
        }
        const updatedUsers = users.map((t) => {
            if (t._id === user._id) return updatedUser;
            else return t;
        })
        setUsers(updatedUsers);

        try {
            await apiUpdateUser(updatedUser)
        } catch (error) {
            console.error("Error updating user:", error);
            setUsers(users);
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
                <DialogTitle>Update User</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Update the details of your user
                    </DialogContentText>
                    <form onSubmit={handleSubmit} id={`update-form-${user._id}`}>
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            name="name"
                            label="Name"
                            fullWidth
                            value={formValues.name}
                            onChange={handleChange}
                        />
                        <TextField
                            margin="dense"
                            name="username"
                            label="Username (comma separated)"
                            fullWidth
                            value={formValues.username}
                            onChange={handleChange}
                        />
                        <TextField
                            margin="dense"
                            name="email"
                            label="Email"
                            fullWidth
                            value={formValues.email}
                            onChange={handleChange}
                        />
                        <TextField
                            margin="dense"
                            name="address"
                            label="Address"
                            fullWidth
                            value={formValues.address}
                            onChange={handleChange}
                        />
                        <TextField
                            margin="dense"
                            name="phone"
                            label="Phone"
                            fullWidth
                            value={formValues.phone}
                            onChange={handleChange}
                        />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit" form={`update-form-${user._id}`}>
                        Update
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}