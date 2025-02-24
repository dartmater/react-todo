import React from "react";
import PropTypes from "prop-types";
import TodoListItem from "../TodoListItem/TodoListItem";

const CompletedTasks = ({ todoList }) => {
  const completedTodos = todoList.filter((todo) => todo.completed || false);

  return (
    <div>
      <h1>Completed</h1>
      <ul>
        {completedTodos.map((todo) => (
          <TodoListItem key={todo.id} todo={todo} />
        ))}
      </ul>
    </div>
  );
};

CompletedTasks.propTypes = {
  todoList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
    })
  ).isRequired,
};

export default CompletedTasks;
