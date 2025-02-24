import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TodoList from "./components/TodoList/TodoList";
import AddTodoForm from "./components/AddTodoForm/AddTodoForm";
import DropdownMenu from "./components/DropdownMenu/DropdownMenu";
import SortButton from "./components/SortButton/SortButton";
import CompletedTasks from "./components/CompletedTasks/CompletedTasks";
import "./App.css";

function App() {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState("asc");

  const fetchData = async () => {
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
      },
    };
    const url = `https://api.airtable.com/v0/${
      import.meta.env.VITE_AIRTABLE_BASE_ID
    }/${
      import.meta.env.VITE_TABLE_NAME
    }?view=Grid%20view&sort[0][field]=Title&sort[0][direction]=${sortOrder}`;

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      const todos = data.records.map((todo) => ({
        title: todo.fields.Title,
        id: todo.id,
        completed: todo.fields.Completed || false,
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
  }, [sortOrder]);

  const postTodo = async (newTodo) => {
    const options = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fields: {
          Title: newTodo.title,
          Completed: false,
        },
      }),
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
      const createdTodo = {
        title: data.fields.Title,
        id: data.id,
        completed: data.fields.Completed || false,
      };
      setTodoList([...todoList, createdTodo]);
    } catch (error) {
      console.log(error.message);
    }
  };

  const deleteTodo = async (id) => {
    const options = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
      },
    };
    const url = `https://api.airtable.com/v0/${
      import.meta.env.VITE_AIRTABLE_BASE_ID
    }/${import.meta.env.VITE_TABLE_NAME}/${id}`;

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const newTodoList = todoList.filter((todo) => todo.id !== id);
      setTodoList(newTodoList);
    } catch (error) {
      console.log(error.message);
    }
  };

  const addTodo = (newTodo) => {
    if (newTodo.title.trim() === "") return;
    postTodo(newTodo);
  };

  const removeTodo = (id) => {
    deleteTodo(id);
  };

  const handleSortOrder = () => {
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };

  const handleToggleComplete = (id) => {
    const updatedTodos = todoList.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodoList(updatedTodos);
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
                    <hr className="line" />
                    <SortButton
                      sortOrder={sortOrder}
                      handleSortOrder={handleSortOrder}
                    />
                    <hr className="line" />
                    <TodoList
                      todoList={todoList.filter((todo) => !todo.completed)}
                      onRemoveTodo={removeTodo}
                      onToggleComplete={handleToggleComplete}
                    />
                  </>
                )}
              </div>
            }
          />
          <Route path="/new" element={<h1>New Todo List</h1>} />
          <Route
            path="/completed"
            element={<CompletedTasks todoList={todoList} />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
