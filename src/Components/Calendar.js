import { useEffect, useState } from 'react';

import { CircularProgress, Container } from '@mui/material';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'

import add from 'date-fns/add';

const apiUrl = process.env.REACT_APP_API_URL;

function Calendar() {
  const [trainings, setTrainings] = useState([]);
  const [ready, setReady] = useState(false);
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchTrainings();
  }, []);

  const fetchTrainings = async () => {
    try {
      const response = await fetch(`${apiUrl}/gettrainings`);
      const data = await response.json();
      setTrainings(data);
      setReady(true);
    } catch (error) {
      console.error(error);
    }
  }

  if (ready) {
    const eventsVar = trainings.map(params => {
      const title = params.customer
        ? `${params.activity} / ${params.customer.firstname} ${params.customer.lastname}`
        : null;

      return {
        title,
        start: new Date(params.date),
        end: add(new Date(params.date), { minutes: params.duration })
      };
    });
    setEvents(eventsVar);
    setReady(false);
    setLoading(false);
  }

  if (loading) {
    return (
      <Container
        component="main"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '80vh',
        }}
      >
        <CircularProgress />
      </Container>
    );
  }


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