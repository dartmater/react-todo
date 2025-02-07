import React from "react";
import styles from "./TodoListItem.module.css";


const TodoListItem = ({ todo, onRemoveTodo }) => {
  console.log("TodoListItem props", todo);
  return (
    <li className={styles.ListItem}>
      {todo.title}
      <button
        type="button"
        onClick={() => onRemoveTodo(todo.id)}
        className={styles.removeButton}
      >
        Remove
      </button>
    </li>
  );
};

export default TodoListItem;
