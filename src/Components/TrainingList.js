import { useState, useEffect } from 'react';
import {AgGridReact} from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import { format } from 'date-fns';

import DeleteIcon from '@mui/icons-material/Delete';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';

function TrainingList() {
  const [trainings, setTrainings] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchTrainings();
  }, []);
  
  const nameValueGetter = (params) => {
    if (params.data.customer === null) {
      return "null";
    } else {
      return params.data.customer.firstname + ' ' + params.data.customer.lastname;
    };
  };

  const dateValueGetter = (params) => {
    return format(new Date(params.data.date), "dd.MM.yyyy' 'hh:mm' 'aaa");
  };

  const linkGetter = (params) => {
    return `https://customerrest.herokuapp.com/api/trainings/${params.data.id}`;
  };

  const fetchTrainings = () => {
    fetch('https://customerrest.herokuapp.com/gettrainings')
    .then(response => response.json())
    .then(data => setTrainings(data))
    .catch(err => console.error(err))
  };

  const deleteTraining = (link) => {
    if (window.confirm('Are you sure you want to delete this training?')) {
      fetch(link, { method: 'DELETE' })
      .then(response => {
      if (!response.ok) {
        alert('Something went wrong in deletion');
      }
      else {
        fetchTrainings();
        setOpen(true);
      }
    })
      .catch(err => console.error(err))
    }
  };

  const [columns, setColumns] = useState([
    {field: 'activity', sortable: true, filter: true, cellStyle: {'text-align': 'left'}, width: 125},
    {headerName: 'Date', valueGetter: dateValueGetter, sortable: true, filter: true, cellStyle: {'text-align': 'left'}, width: 175},
    {headerName: 'Duration (min)', field: 'duration', sortable: true, filter: true, width: 150, cellStyle: {'text-align': 'left'}},
    {headerName: 'Customer', valueGetter: nameValueGetter, sortable: true, filter: true, cellStyle: {'text-align': 'left'}, width: 155},
    {
        headerName: '',
        valueGetter: linkGetter,
        width: 100,
        cellRenderer: params => 
        <IconButton onClick={() => deleteTraining(params.value)}>
          <DeleteIcon style={{ color: 'red' }} />
        </IconButton>
    }
  ]);

  return(
    <>
      <div className="ag-theme-material" style={{height: 409, width: 770, margin: 'auto'}}>
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
        open={open}
        autoHideDuration={4000}
        onClose={() => setOpen(false)}
        message='Training was deleted successfully'
      />
    </>
  );
}

export default TrainingList;
