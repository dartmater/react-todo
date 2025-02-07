import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TodoList from "./components/TodoList/TodoList";
import AddTodoForm from "./components/AddTodoForm/AddTodoForm";
import DropdownMenu from "./components/DropdownMenu/DropdownMenu";
import "./App.css";

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
        title: todo.fields.Title,
        id: todo.id,
      }));
      setTodoList(todos);
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const addTodo = (newTodo) => {
    if (newTodo.title.trim() === "") return;
    setTodoList([...todoList, newTodo]);
  };

  const removeTodo = (id) => {
    const newTodoList = todoList.filter((todo) => todo.id !== id);
    setTodoList(newTodoList);
  };

  return (
    <BrowserRouter>
      <div className="app">
        <DropdownMenu />

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
      </div>
    </BrowserRouter>
  );
}

export default App;
