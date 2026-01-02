import {deleteTodo as apiDeleteTodo} from "./ApiTodos";

const deleteTodo = async ({id, todos, setTodos}) => {
        const originalTodos = [...todos];

        setTodos(todos.filter(t => t._id !== id));
        try {
            await apiDeleteTodo(id);
        } catch (error) {
            console.error("Error deleting todo:", error);
            setTodos(originalTodos);
        }
    };

export default deleteTodo;

