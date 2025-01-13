import React, { useState, useEffect } from "react";
import "./App.css";
import TodoList from "./TodoList";
import AddTodoForm from "./AddTodoForm";

// function useSemiPersistentState(key, initialValue) {
//   const [value, setValue] = useState(() => {
//     const savedValue = localStorage.getItem(key);
//    return savedValue !== null && savedValue !== "undefined"
//       ? JSON.parse(savedValue)
//       : initialValue;
//   });

//

function App() {
  const [todoList, setTodoList] = useState(() => {
    const savedTodoList = localStorage.getItem("savedTodoList");
    return savedTodoList !== null && savedTodoList !== "undefined"
      ? JSON.parse(savedTodoList)
      : [];
  });

  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          data: {
            todoList: JSON.parse(localStorage.getItem("savedTodoList") || "[]"),
          },
        });
      }, 2000);
    }).then((result) => {
      setTodoList(result.data.todoList);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("savedTodoList", JSON.stringify(todoList));
    }
  }, [todoList, isLoading]);

  const addTodo = (newTodo) => {
    setTodoList([...todoList, newTodo]);
  };

  const removeTodo = (id) => {
    const newTodoList = todoList.filter((todo) => todo.id !== id);
    setTodoList(newTodoList);
  };

  return (
    <>
      <h1>Todo List</h1>
      <AddTodoForm onAddTodo={addTodo} />
      <TodoList todoList={todoList} onRemoveTodo={removeTodo} />
    </>
  );
}

export default App;
