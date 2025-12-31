import Axios from "axios";

const deleteTodo = async ({id, todos, setTodos}) => {
        const originalTodos = [...todos];

        setTodos(todos.filter(t => t._id !== id));
        try {
            await Axios.delete("http://localhost:4500/api/todos", { data: { _id: id } });
        } catch (error) {
            console.error("Error deleting todo:", error);
            setTodos(originalTodos);
        }
    };

export default deleteTodo;

