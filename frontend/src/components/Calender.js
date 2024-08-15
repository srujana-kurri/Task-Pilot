import React, { useState, useEffect } from 'react';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { useSelector,useDispatch } from 'react-redux';
import { getData } from '../reduxstore/dataslice';
import { handleSave } from './TaskManager';

function Calendar() {
  const dispatch  = useDispatch();
  useEffect(()=>{
    dispatch(getData())
    console.log("in calendar");
  },[handleSave]);
  const data = useSelector((state) => state.app.user.tasks);
  const [events, setEvents] = useState([]);
  const [eventInfo, setEventInfo] = useState(null);
  const [eventPosition, setEventPosition] = useState({ top: 0, left: 0 })
  console.log(data);
  useEffect(() => {
    if(data){
      const newEvents = data.map(task => ({
        title: task.title,
        date: task.duedate.substring(0,10), 
        description: task.category

      }));
      setEvents(newEvents);
      }
    }, []);
    console.log(events);
    
    document.addEventListener("mousemove", (event) => {
      const mouseX = event.clientX;
      const mouseY = event.clientY;
    
      
      setEventPosition({
        top: mouseY + 5, // Adjust the vertical position
        left: mouseX + 5, // Adjust the horizontal position
      });
    });
    const handleMouseEnter = (info) => {
      const event = info.event;
      const description = event.extendedProps.description;
      setEventInfo(description);
      
    };
    

    const handleMouseLeave = () => {
      setTimeout(() => {
        setEventInfo(null);
      }, 500);
    };
  
    
  return (
    <div className='calendar-container d-flex justify-content-center align-items-center'>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView='dayGridMonth'
        events={events}
        // dateClick = {handleDateClick}
        eventMouseEnter={handleMouseEnter}
        eventMouseLeave={handleMouseLeave}

      />
       {eventInfo && (
       <div style={{ position: 'absolute', top:eventPosition.top, left: eventPosition.left, background: 'white', padding: '5px', border: '1px solid black',zIndex:"99",borderRadius:"10px",transition:"position 10s" }}>
       {eventInfo}
     </div>
      )}
    </div>
  );
}

export default Calendar;
