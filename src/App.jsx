import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";


function App() {
  // Define the todo list array
  const todoList = [
    { id: 1, title: "Complete assignment" },
    { id: 2, title: "Treat yourself" },
    { id: 3, title: "Go to sleep" },
  ];

  return (
    <>
      <h1>Todo List</h1>
      <ul>
        {todoList.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </>
  );
}

export default App;
