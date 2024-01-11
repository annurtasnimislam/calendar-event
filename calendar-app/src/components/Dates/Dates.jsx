import React, { useEffect, useState } from "react";
import Event from '../Event/Event'
import {
  format,
  startOfWeek,
  addDays,
  startOfMonth,
  endOfMonth,
  getYear,
  endOfWeek,
  isFirstDayOfMonth,
  isToday,
  getMonth,
  getDate,
  isSameMonth,
  subDays,
} from "date-fns";
import "./Dates.css";

const Dates = ({
  activeDate,
  selectedDate,
  setSelectedDate,
  onLeftbar,
  events,
  setShowEvent
}) => {
  // console.log('dates',selectedDate)
  const [currentWeekDates, setCurrentWeekDates] = useState([]);
  const [isSelected, setIsSelected] = useState(false);


  const today = format(new Date(), "d");

  const startOfTheSelectedMonth = startOfMonth(activeDate);
  const endOfTheSelectedMonth = endOfMonth(activeDate);
  const startDate = startOfWeek(startOfTheSelectedMonth);
  const endDate = endOfWeek(endOfTheSelectedMonth);

  const handleShowEvent=(date)=>{
    setShowEvent(true)
    setSelectedDate(date);
    setIsSelected(!isSelected);
  }

  useEffect(() => {
    // days of a week
    const getWeekDates = (startDate) => {
      let currentDate = startDate;
      const week = [];
      for (let d = 0; d < 7; d++) {
        week.push(format(currentDate, "MMM d"));
        currentDate = addDays(currentDate, 1);
      }
      return week;
    };

    const allWeeks = [];
    let currentDate = startDate;

    while (allWeeks.length < 5) {
      allWeeks.push(getWeekDates(currentDate));
      currentDate = addDays(currentDate, 7);
    }

    setCurrentWeekDates(allWeeks);
  }, [activeDate]);

  return (
    <div className="dates-container">
     
      
      {currentWeekDates.map((week, index) => {
        // console.log('currentWeekDates',currentWeekDates)
        return (
          <div key={index} className="week">
            {week.map((date, idx) => {
              const dateEvents = events?.filter(
                (event) => format(event?.date, "MMM d") === date
              );
              
              const dateNum = date.slice(4);

              return (
                <div
                  key={idx}
                  className={`${
                    onLeftbar === false ? "week-cell" : "week-cell-left"
                  } text-black date-click`}
                  onClick={() => handleShowEvent(date)}
                >
                  <span className={`${dateNum === today ? "today" : ""}  `}>
                    {dateNum == 1 ? date : dateNum}
                  </span>
                  {/* show event if exists */}
                  <div className="events-container">
                  {
                    dateEvents?.map((event, eventIdx) => (
                      <div key={eventIdx} className="event">
                        <div className="dot"></div>
                        {event?.title}
                      </div>
                    ))}
                  </div>
                  
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Dates;
