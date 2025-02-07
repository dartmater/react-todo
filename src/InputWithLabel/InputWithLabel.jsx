import React, { useRef, useEffect } from "react";
import styles from "./InputWithLabel.module.css";

const InputWithLabel = (props) => {
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  return (
    <>
      <label htmlFor="todoTitle" className={styles.label}>{props.children}</label>

      <input
        ref={inputRef}
        className={`${styles.input} text`}
        id="todoTitle"
        name="title"
        value={props.todoTitle}
        onChange={props.handleTitleChange}
      />
    </>
  );
};

export default InputWithLabel;
