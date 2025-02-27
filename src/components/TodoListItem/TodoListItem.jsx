import React, { useState } from "react";
import styles from "./TodoListItem.module.css";
import checkmark from "../../assets/checkmark.png";
import PropTypes from "prop-types";

const TodoListItem = ({ todo, onRemoveTodo, onToggleComplete }) => {
  const [completed, setCompleted] = useState(todo.completed);

  const handleToggleComplete = async () => {
    const newCompleted = !completed;
    setCompleted(newCompleted);
    onToggleComplete(todo.id, newCompleted);
  };

  return (
    <li className={styles.ListItem}>
      <div className={styles.checkmarkContainer}>
        <img
          src={checkmark}
          alt="Checkmark"
          className={`${styles.checkmark} ${
            completed ? styles.checkmarkCompleted : ""
          }`}
          onClick={handleToggleComplete}
        />
        <span
          className={completed ? styles.todoCompleted : ""}
          style={{ marginLeft: "10px" }}
        >
          {todo.title}
        </span>
      </div>
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

TodoListItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
  onRemoveTodo: PropTypes.func.isRequired,
  onToggleComplete: PropTypes.func.isRequired,
};

export default TodoListItem;
