import React from "react";
import styles from "./TodoListItem.module.css";
import PropTypes from "prop-types";

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

TodoListItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  onRemoveTodo: PropTypes.func.isRequired,
};

export default TodoListItem;
