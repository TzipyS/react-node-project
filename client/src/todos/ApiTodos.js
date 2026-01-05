import Axios from "axios";

export const toggleTodoCompleted = (id, completed) => {
  return Axios.put("http://localhost:4500/api/todos", {
    _id: id,
    completed
  });
};

export const updateTodo = (todo) => {
  return Axios.put("http://localhost:4500/api/todos", todo);
};

export const fetchTodos = () => {
  return Axios.get("http://localhost:4500/api/todos");
};

export const createTodo = (title, tags, completed) => {
  return Axios.post("http://localhost:4500/api/todos", { title, tags, completed });
};

export const deleteTodo = (id) => {
  return   Axios.delete("http://localhost:4500/api/todos", { data: { _id: id } });
};

export const fetchTodosById = (id) => {
  return Axios.get(`http://localhost:4500/api/todos/${id}`)
}
