import React, { useState } from "react";
import InputWithLabel from "../InputWithLabel/InputWithLabel";
import styles from "./AddTodoForm.module.css";

function AddTodoForm({ onAddTodo }) {
  const [todoTitle, setTodoTitle] = useState("");
  const handleTitleChange = (event) => {
    const newTodoTitle = event.target.value;
    setTodoTitle(newTodoTitle);
  };

  const handleAddTodo = (event) => {
    event.preventDefault();

    onAddTodo({ title: todoTitle, id: Date.now() });
    setTodoTitle("");
  };
  return (
    <form onSubmit={handleAddTodo}>
      <InputWithLabel
        todoTitle={todoTitle}
        handleTitleChange={handleTitleChange}
      >
        Title
      </InputWithLabel>

      <button className={styles.addButton} type="submit">
        Add
      </button>
    </form>
  );
}

export default AddTodoForm;
