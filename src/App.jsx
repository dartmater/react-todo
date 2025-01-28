import React, { useState, useEffect } from "react";
import "./App.css";
import TodoList from "./TodoList";
import AddTodoForm from "./AddTodoForm";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// function useSemiPersistentState(key, initialValue) {
//   const [value, setValue] = useState(() => {
//     const savedValue = localStorage.getItem(key);
//     return savedValue !== null && savedValue !== "undefined"
//       ? JSON.parse(savedValue)
//       : initialValue;
//   });
//   return [value, setValue];
// }

function App() {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
      },
    };
    const url = `https://api.airtable.com/v0/${
      import.meta.env.VITE_AIRTABLE_BASE_ID
    }/${import.meta.env.VITE_TABLE_NAME}`;
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      const todos = data.records.map((todo) => ({
        title: todo.fields.title,
        id: todo.id,
      }));
      setTodoList(todos);
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const addTodo = (newTodo) => {
    if (!newTodo.title) {
      return; // not empty
    }
    const newTodoList = [...todoList, newTodo];
    setTodoList(newTodoList);
  };

  const removeTodo = (id) => {
    const newTodoList = todoList.filter((todo) => todo.id !== id);
    setTodoList(newTodoList);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <h1>Todo List</h1>
              {isLoading ? (
                <p>Loading...</p>
              ) : (
                <>
                  <AddTodoForm onAddTodo={addTodo} />
                  <TodoList todoList={todoList} onRemoveTodo={removeTodo} />
                </>
              )}
            </div>
          }
        />
        <Route path="/new" element={<h1>New Todo List</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
