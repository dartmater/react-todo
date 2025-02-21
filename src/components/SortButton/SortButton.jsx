import React from "react";
import PropTypes from "prop-types";
import styles from "./SortButton.module.css"; // Import CSS module

const SortButton = ({ sortOrder, handleSortOrder }) => {
  return (
    <button onClick={handleSortOrder} className={styles.sortButton}>
      Sort: {sortOrder === "asc" ? "Ascending" : "Descending"}
    </button>
  );
};

SortButton.propTypes = {
  sortOrder: PropTypes.oneOf(["asc", "desc"]).isRequired,
  handleSortOrder: PropTypes.func.isRequired,
};


export default SortButton;
