import {updateTodo as apiUpdateTodo} from "./ApiTodos";

const handleCheckboxChange = async ({id, todos, setTodos}) => {
        const todo = todos.find(t => t._id === id)
        const updatedTodo = {
            _id: todo._id,
            title: todo.title,
            completed: !todo.completed
        }
        setTodos(todos.map(t => t._id === id ? updatedTodo : t))
        try {
            await apiUpdateTodo(updatedTodo);
        } catch (error) {
            console.error("Error updating todo:", error)
            setTodos(todos)
        }
    };

export default handleCheckboxChange;