import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import TodoList from "./TodoList";
import AddTodoForm from "./AddTodoForm";

function App() {
  // Define the todo list array
  const [newTodo, setNewTodo] = useState("");
  const handleAddTodo = (todoTitle) => {
    setNewTodo(todoTitle);
  }
  return (
    <div>
      <h1>Todo List</h1>
      <AddTodoForm onAddTodo={handleAddTodo}/>
      <p>{newTodo}</p>
      <TodoList />
    </div>
  );
}

export default App;
