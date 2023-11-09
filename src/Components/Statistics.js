import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { groupBy, sumBy } from 'lodash';


function Statistics() {
  const [trainings, setTrainings] = useState([]);
  const [ready, setReady] = useState(false);
  const [data, setData] = useState([]);

  let datas = [];

  useEffect(() => {
    fetchTrainings();
  }, []);

  const fetchTrainings = () => {
    fetch('https://traineeapp.azurewebsites.net/gettrainings')
      .then(response => response.json())
      .then(data => {
        setTrainings(data);
        setReady(true);
      })
      .catch(err => console.error(err))
  };

  if (ready) {
    let myData = {};
    let grouppedObject = groupBy(trainings, 'activity');
    for (let item in grouppedObject) {
      myData = {
        "name": item,
        "value": sumBy(grouppedObject[item], 'duration')
      };
      datas.push(myData);
    };
    setData(datas);
    setReady(false);
  };

  return (
    <ResponsiveContainer width='90%' height='90%'>
      <BarChart
        width={100}
        height={50}
        data={data}
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