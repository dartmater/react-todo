import React, { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import TodoList from "./TodoList";
import AddTodoForm from "./AddTodoForm";

function useSemiPersistentState(key, initialValue){

  const [value, setValue] = useState(()=>{
    const savedValue=localStorage.getItem(key);
    return savedValue ? JSON.parse(savedValue): initialValue;
      });
       
  useEffect(()=> {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value]);

  return [value, setValue];
}

function App() {
  const [todoList, setTodoList] = useSemiPersistentState("savedTodoList",[])

  const addTodo = (newTodo) => {
    setTodoList([...todoList, newTodo]);
  };

  return (
    <>
      <h1>Todo List</h1>
      <AddTodoForm onAddTodo={addTodo} />
      <TodoList todoList={todoList} />
    </>
  );
}

export default App;
