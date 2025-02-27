import React from "react";
import styles from "./Footer.module.css";
import log from "../../assets/log.png";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <img src={log} alt="Logo" className={styles.logo} />
      <span className={styles.text}>
        @Elle Popova {new Date().getFullYear()}
      </span>
    </footer>
  );
};

export default Footer;
