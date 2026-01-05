import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import FormDialog from "./createTodo";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import deleteTodo from "./DeleteTodo";
import handleCheckboxChange from "./changeTodo"
import { fetchTodos as apiFetchTodos } from "./ApiTodos";
import UpdateTodoDialog from "./UpdateTodo"



const Todos = () => {
    const [todos, setTodos] = useState([])

    const fetchTodos = async () => {
        try {
            const { data } = await apiFetchTodos();
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

    return (
        <div className="todos">
            <FormDialog />
            {todos.map((todo) => (
                <div key={todo._id} className="todo-item">
                    <h3>{todo.title}</h3>
                    <Stack direction="row" spacing={1} alignItems="center">
                        <Button
                            variant="contained"
                            onClick={() => handleCheckboxChange({ id: todo._id, todos, setTodos })}
                        >
                            {todo.completed ? "✔ Completed" : "Pending"}
                        </Button>

                        <Stack spacing={2} direction="row">

                            <Button
                                variant="outlined"
                                onClick={() => deleteTodo({ id: todo._id, todos, setTodos })} >
                                Delete
                            </Button>

                            <UpdateTodoDialog todo={todo} todos={todos} setTodos={setTodos} />
                        </Stack>
                    </Stack>
                </div>
            ))}
            <Link to="/">Home</Link>
        </div>
    )
}
export default Todos