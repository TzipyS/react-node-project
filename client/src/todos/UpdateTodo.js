import Axios from "axios";

const handleCheckboxChange = async ({id, todos, setTodos}) => {
        const todo = todos.find(t => t._id === id)
        const updatedTodo = {
            _id: todo._id,
            title: todo.title,
            completed: !todo.completed
        }
        setTodos(todos.map(t => t._id === id ? updatedTodo : t))
        try {
            await Axios.put("http://localhost:4500/api/todos", updatedTodo)
        } catch (error) {
            console.error("Error updating todo:", error)
            setTodos(todos)
        }
    };

export default handleCheckboxChange;