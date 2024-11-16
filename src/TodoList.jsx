/*React Fragments <> </> */

import React from "react";

const todoList = [
  { id: 1, title: "Complete assignment" },
  { id: 2, title: "Treat yourself" },
  { id: 3, title: "Go to sleep" },
];

function TodoList() {
  return (
    <div>
      <ul>
        {todoList.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </div>
  );
}
export default TodoList;
