import React, { useRef, useEffect } from "react";

const InputWithLabel = (props) => {
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  return (
    <>
      <label htmlFor="todoTitle">{props.children}</label>

      <input
        ref={inputRef}
        className="text"
        id="todoTitle"
        name="title"
        value={props.todoTitle}
        onChange={props.handleTitleChange}
      />
    </>
  );
};

export default InputWithLabel;
