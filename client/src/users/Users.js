import { Link } from "react-router-dom";
import Axios from "axios";
import { useEffect, useState } from "react";
const Users = () => {
    const [users, setUsers] = useState([])
    const fetchUsers = async () => {
        try {   
            const {data} = await Axios.get("http://localhost:4500/api/users")
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
            {users.map((user) => (
                <div key={user.id} className="user-item">
                    <h3>{user.name}</h3>
                    <p>{user.email}</p>
                </div>
            ))}
            <Link to="/">Home</Link>
        </div>
    )
}   
export default Users;