import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { groupBy, sumBy } from 'lodash';
import { CircularProgress, Container } from '@mui/material';

const apiUrl = process.env.REACT_APP_API_URL;

function Statistics() {
  const [loading, setLoading] = useState(true);
  const [trainings, setTrainings] = useState([]);

  const fetchTrainings = async () => {
    try {
      const response = await fetch(`${apiUrl}/gettrainings`);
      const trainingsData = await response.json();

      const grouppedObject = groupBy(trainingsData, 'activity');
      const newData = Object.keys(grouppedObject).map(item => ({
        name: item,
        value: sumBy(grouppedObject[item], 'duration'),
      }));

      setTrainings(newData);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchTrainings();
  }, []);

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
    <ResponsiveContainer width='90%' height='90%'>
      <BarChart
        width={100}
        height={50}
        data={trainings}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <XAxis dataKey="name" />
        <YAxis label={{ value: 'Duration (min)', angle: -90, position: 'insideLeft', offset: -10 }} />
        <Tooltip />
        <Bar dataKey="value" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default Statistics;