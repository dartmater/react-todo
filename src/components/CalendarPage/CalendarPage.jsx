import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import styles from "./CalendarPage.module.css";

const CalendarComponent = () => {
  const [date, setDate] = useState(new Date());

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  return (
    <div className={styles.calendarPage}>
      <h1>Calendar</h1>
      <Calendar
        onChange={handleDateChange}
        value={date}
        className={styles.reactCalendar}
      />
    </div>
  );
};

export default CalendarComponent;
