import {deleteUser as ApideleteUser} from "./ApiUsers";

const deleteUser = async ({id, users, setUsers}) => {
        const originalUsers = [...users];

        setUsers(users.filter(u => u._id !== id));
        try {
            await ApideleteUser({ _id: id });
        } catch (error) {
            console.error("Error deleting user:", error);
            setUsers(originalUsers);
        }
    };

export default deleteUser;