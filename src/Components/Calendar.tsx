import { FC, useEffect, useState } from 'react';

import { CircularProgress, Container } from '@mui/material';

import '@fullcalendar/react/dist/vdom';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'

import add from 'date-fns/add';
import { TrainingWithCustomer } from '../types';

const apiUrl = 'https://traineeapp.azurewebsites.net';

const Calendar: FC = () => {
    const [trainings, setTrainings] = useState<TrainingWithCustomer[]>([]);
    const [ready, setReady] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [events, setEvents] = useState<any[]>([]);

    useEffect((): void => {
        fetchTrainings();
    }, []);

    const fetchTrainings = async (): Promise<void> => {
        try {
            const response: Response = await fetch(`${apiUrl}/gettrainings`);
            if (response.ok) {
                const data: TrainingWithCustomer[] = await response.json();
                setTrainings(data);
                setReady(true);
            } else {
                alert('Something went wrong');
            }
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