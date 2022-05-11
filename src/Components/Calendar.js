import { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'

import add from 'date-fns/add';

function Calendar() {
    const [trainings, setTrainings] = useState([]);
    const [ready, setReady] = useState(false);
    const [events, setEvents] = useState([]);

    let eventsVar = [];

    useEffect(() => {
        fetchTrainings();
    }, []);
    
    const fetchTrainings = () => {
      fetch('https://customerrest.herokuapp.com/gettrainings')
      .then(response => response.json())
      .then(data => {
          setTrainings(data);
          setReady(true);
      })
      .catch(err => console.error(err))
    };

    if (ready) {
      let train = {};
      trainings.map(params =>  {
        if (params.customer !== null) {
          train = {
            title: params.activity + ' / ' + params.customer.firstname + ' ' + params.customer.lastname,
            start: new Date(params.date),
            end: add(new Date(params.date), {minutes: params.duration})
          };
        } else {
          train = {
            title: null,
            start: new Date(params.date),
            end: add(new Date(params.date), {minutes: params.duration})
          };
        }
        eventsVar.push(train);
      });
      setEvents(eventsVar);
      setReady(false);
    };
  
  return (
    <FullCalendar
    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      headerToolbar={{
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
      }}
      initialView='dayGridMonth'
      events={events}
    />
  );
}

export default Calendar;