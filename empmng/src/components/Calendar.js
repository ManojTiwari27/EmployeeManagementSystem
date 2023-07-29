import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import '../App.css';

const Calendar = () => {
  const { id: employeeId } = useParams();

  const selectedDatesKey = `selectedDates_${employeeId}`;

  const [selectedDates, setSelectedDates] = useState(() => {
    const storedDates = JSON.parse(localStorage.getItem(selectedDatesKey));
    return storedDates ? storedDates : [];
  });

  const handleClearClick = () => {
    localStorage.removeItem('selectedDates')
    setSelectedDates([]);

  };

  const handleDateClick = (date) => {
    if (selectedDates.includes(date)) {
      setSelectedDates(selectedDates.filter((d) => d !== date));
    } else {
      setSelectedDates([...selectedDates, date]);
    }
  };
  useEffect(() => {
    const storedDates = JSON.parse(localStorage.getItem(selectedDatesKey));
    if (storedDates) {
      setSelectedDates(storedDates);
    }

    // eslint-disable-next-line
  }, [employeeId]);

  useEffect(() => {
    localStorage.setItem(selectedDatesKey, JSON.stringify(selectedDates));
    // eslint-disable-next-line
  }, [selectedDates]);


  const renderCalendar = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const calendar = [];

    let day = 1;
    for (let i = 0; i < 6; i++) {
      const week = [];
      for (let j = 0; j < 7; j++) {
        if ((i === 0 && j < firstDay) || day > daysInMonth) {
          week.push(<td key={`${i}-${j}`}></td>)
        } else {
          const date = new Date(year, month, day);
          const isChecked = selectedDates.includes(date.toISOString().slice(0, 10));

          week.push(
            <td
              key={`${i}-${j}`}
              className={isChecked ? "selected" : ""}
              onClick={() => handleDateClick(date.toISOString().slice(0, 10))}
            >
              {day}
            </td>
          );
          day++;
        }
      }
      calendar.push(<tr key={i}>{week}</tr>);
    }

    return <tbody className="tablebgcolor">{calendar}</tbody>;
  };

  return (
    <div className="container" style={{ marginTop: '90px' }}>
      <div className="calendar">
        <table className="table ttable-light shadow-lg p-3 mb-5  rounded">
          <thead className="tablebgcolor">
            <tr>
              <th>Sun</th>
              <th>Mon</th>
              <th>Tue</th>
              <th>Wed</th>
              <th>Thu</th>
              <th>Fri</th>
              <th>Sat</th>
            </tr>
          </thead>
          {renderCalendar()}
        </table>
        <div className="d-flex justify-content-center">
          <button className="btn btn-secondary" onClick={handleClearClick} >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
};

export default Calendar;