import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {fetchUser as apifetchUser} from "./ApiUsers";
import FormDialog from "./createUser";
import deleteUser from "./DeleteUser";
import Button from '@mui/material/Button';


const Users = () => {
    const [users, setUsers] = useState([])
    const fetchUsers = async () => {
        try {   
            const {data} = await apifetchUser();
            setUsers(data)
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    }
    useEffect(() => {
        fetchUsers()
    }, [])
    if (users.length === 0) {
        return <h1>Loading...</h1>
    }
    return (
        <div className="users">
            <FormDialog />
            {users.map((user) => (
                <div key={user.id} className="user-item">
                    <h3>{user.name}</h3>
                    <p>{user.email}</p>
                    <Button
                        variant="outlined"
                        onClick={() => deleteUser({ id: user._id, users, setUsers })} >
                        Delete
                    </Button>
                    <Button variant="outlined">
                        Update
                    </Button>
                </div>
            ))}
            <Link to="/">Home</Link>
        </div>
    )
}   
export default Users;