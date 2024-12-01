import React from "react";

function AddTodoForm(props) {
  const handleAddTodo = (event) => {
    event.preventDefault();
    const todoTitle = event.target.title.value;
    console.log(todoTitle);
    props.onAddTodo(todoTitle);
    event.target.reset();
  };
  return (
    <form onSubmit={handleAddTodo}>
      <label htmlFor="todoTitle">Title</label>
      <input className="text" id="todoTitle" name="title" />
      <button className="btn" type="submit">
        Add
      </button>
    </form>
  );
}

export default AddTodoForm;
