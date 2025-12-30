import { Link } from "react-router-dom";
import Axios from "axios";
import { useEffect, useState } from "react";


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


    return (
        <div className="todos">
            {todos.map((todo) => (
                <div key={todo.id} className="todo-item">
                    <h3>{todo.title}</h3>
                    <p>{todo.completed ? "Completed" : "Pending"}</p>
                    <input 
                        type='checkbox' 
                        checked={todo.completed} 
                        readOnly
                    />
                </div>

            ))}
            <Link to="/">Home</Link>
        </div>
    )
}
export default Todos