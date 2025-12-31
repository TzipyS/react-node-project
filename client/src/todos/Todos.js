import { Link } from "react-router-dom";
import Axios from "axios";
import { useEffect, useState } from "react";
import FormDialog from "../todos/createTodo";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import deleteTodo from "./DeleteTodo";

const Todos = () => {
    const [todos, setTodos] = useState([])

    const fetchTodos = async () => {
        try {
            const { data } = await Axios.get("http://localhost:4500/api/todos")
            setTodos(data)

        } catch (error) {
            console.error("Error fetching todos:", error);
        }
    }
    useEffect(() => {
        fetchTodos()
    }, [])
    if (todos.length === 0) {
        return <h1>Loading...</h1>
    }

    //שינוי completed
    const handleCheckboxChange = async (id) => {
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



    return (
        <div className="todos">
            {todos.map((todo) => (
                <div key={todo._id} className="todo-item">
                    <h3>{todo.title}</h3>
                    <Stack direction="row" spacing={1} alignItems="center">
                        <Button
                            variant="contained"
                            onClick={() => handleCheckboxChange(todo._id)}
                        >
                            {todo.completed ? "✔ Completed" : "Pending"}
                        </Button>

                        <Stack spacing={2} direction="row">
                            <FormDialog />
                            <Button
                                variant="outlined"
                                onClick={() => deleteTodo({id: todo._id,todos,setTodos})} >
                                Delete
                            </Button>
                        </Stack>
                    </Stack>
                </div>
            ))}
            <Link to="/">Home</Link>
        </div>
    )
}
export default Todos