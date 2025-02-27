import React from "react";
import TodoListItem from "../TodoListItem/TodoListItem";
import PropTypes from "prop-types";

function TodoList({ todoList, onRemoveTodo, onToggleComplete }) {
  return (
    <ul>
      {todoList.map((todo) => (
        <TodoListItem
          key={todo.id}
          todo={todo}
          onRemoveTodo={onRemoveTodo}
          onToggleComplete={onToggleComplete}
        />
      ))}
    </ul>
  );
}

TodoList.propTypes = {
  todoList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
  onRemoveTodo: PropTypes.func.isRequired,
  onToggleComplete: PropTypes.func.isRequired,
};

export default TodoList;
