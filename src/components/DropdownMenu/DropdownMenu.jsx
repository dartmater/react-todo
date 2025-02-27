import React, { useState } from "react";
import { LiaClipboardListSolid } from "react-icons/lia";
import { NavLink } from "react-router-dom";
import styles from "./DropdownMenu.module.css";

const DropdownMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.dropdown}>
      <div className={styles.iconContainer} onClick={toggleDropdown}>
        <LiaClipboardListSolid className={styles.icon} />
      </div>

      <ul className={`${styles.dropdownList} ${isOpen ? styles.open : ""}`}>
        <li>
          <NavLink to="/" className={styles.navLink}>
            Todo List
          </NavLink>
        </li>
        <li>
          <NavLink to="/completed" className={styles.navLink}>
            {" "}
            Completed
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default DropdownMenu;
