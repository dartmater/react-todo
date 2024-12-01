import React from "react";
import TodoListItem from "./TodoListItem";

const todoList = [
  { id: 1, title: "Complete assignment" },
  { id: 2, title: "Treat yourself" },
  { id: 3, title: "Go to sleep" },
];

function TodoList() {
  return (
    <ul>
      {todoList.map((todo) => (
        <TodoListItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
}
export default TodoList;
