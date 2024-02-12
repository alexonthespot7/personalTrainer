import { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

import { format } from 'date-fns';

import { Snackbar, IconButton } from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';

const apiUrl = process.env.REACT_APP_API_URL;

function TrainingList() {
  const [trainings, setTrainings] = useState([]);
  const [trainingDeleted, setTrainingDeleted] = useState(false);

  useEffect(() => {
    fetchTrainings();
  }, []);

  const nameValueGetter = (params) => {
    if (params.data.customer === null) {
      return "null";
    } else {
      return params.data.customer.firstname + ' ' + params.data.customer.lastname;
    }
  }

  const dateValueGetter = (params) => {
    return format(new Date(params.data.date), "dd.MM.yyyy' 'hh:mm' 'aaa");
  }

  const linkGetter = (params) => {
    return `${apiUrl}/api/trainings/${params.data.id}`;
  }

  const fetchTrainings = async () => {
    try {
      const response = await fetch(`${apiUrl}/gettrainings`);
      if (response.ok) {
        const data = await response.json();
        setTrainings(data);
      } else {
        alert('Something went wrong');
      }
    } catch (err) {
      console.error(err);
    }
  }

  const deleteTraining = async (link) => {
    if (window.confirm('Are you sure you want to delete this training?')) {
      try {
        const response = await fetch(link, { method: 'DELETE' });
        if (response.ok) {
          await fetchTrainings();
          setTrainingDeleted(true);
        } else {
          alert('Something went wrong in deletion');
        }
      } catch (err) {
        console.error(err);
        alert('Something went wrong in deletion');
      }
    }
  }

  const columns = [
    { field: 'activity', sortable: true, filter: true, cellStyle: { 'textAlign': 'left' }, width: 125 },
    { headerName: 'Date', valueGetter: dateValueGetter, sortable: true, filter: true, cellStyle: { 'textAlign': 'left' }, width: 175 },
    { headerName: 'Duration (min)', field: 'duration', sortable: true, filter: true, width: 150, cellStyle: { 'textAlign': 'left' } },
    { headerName: 'Customer', valueGetter: nameValueGetter, sortable: true, filter: true, cellStyle: { 'textAlign': 'left' }, width: 155 },
    {
      headerName: '',
      valueGetter: linkGetter,
      width: 100,
      cellRenderer: params =>
        <IconButton onClick={() => deleteTraining(params.value)}>
          <DeleteIcon style={{ color: 'red' }} />
        </IconButton>
    }
  ];

  return (
    <>
      <div className="ag-theme-material" style={{ height: 409, width: 770, margin: 'auto' }}>
        <AgGridReact
          columnDefs={columns}
          rowData={trainings}
          pagination={true}
          paginationPageSize={5}
          suppressCellFocus={true}
          animateRows="true"
        />
      </div>
      <Snackbar
        open={trainingDeleted}
        autoHideDuration={4000}
        onClose={() => setTrainingDeleted(false)}
        message='Training was deleted successfully'
      />
    </>
  );
}

export default TrainingList;
