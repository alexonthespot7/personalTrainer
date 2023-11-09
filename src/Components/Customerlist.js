import React, { useCallback, useState, useEffect, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';

import Addcustomer from './Addcustomer';
import Editcustomer from './Editcustomer';
import Addtraining from './Addtraining';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

import DeleteIcon from '@mui/icons-material/Delete';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import MuiAlert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function CustomerList() {
  const gridRef = useRef();
  const [customers, setCustomers] = useState([]);
  const [open, setOpen] = useState(false);
  const [addCustomerSnack, setAddCusSnack] = useState(false);
  const [editcustomerSnack, setEdCusSnack] = useState(false);
  const [addTrainingSnack, setAddTrainSnack] = useState(false);



  useEffect(() => {
    fetchCustomers();
  }, []);

  const onBtnExport = useCallback(() => {
    gridRef.current.api.exportDataAsCsv();
  }, []);

  const fetchCustomers = () => {
    fetch('https://traineeapp.azurewebsites.net/api/customers')
      .then(response => response.json())
      .then(data => setCustomers(data.content))
      .catch(err => console.error(err))
  };

  const linkGetter = (params) => {
    return params.data.links[0].href;
  };

  const addCustomer = (newCustomer) => {
    fetch('https://traineeapp.azurewebsites.net/api/customers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newCustomer)
    })
      .then(response => {
        if (response.ok) {
          fetchCustomers();
          setAddCusSnack(true);
        } else {
          alert('Something went wrong during the customer adding!');
        }
      })
      .catch(err => console.error(err));
  };

  const deleteCustomer = (link) => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      fetch(link, { method: 'DELETE' })
        .then(response => {
          if (!response.ok) {
            alert('Something went wrong in deletion');
          }
          else {
            fetchCustomers();
            setOpen(true);
          }
        })
        .catch(err => console.error(err))
    }
  };

  const updateCustomer = (updatedCustomer, link) => {
    fetch(link, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedCustomer)
    })
      .then(response => {
        if (response.ok) {
          fetchCustomers();
          setEdCusSnack(true);
        } else {
          alert('Something went wrong during the customer info updating');
        }
      })
      .catch(err => console.error(err))
  };

  const addTraining = (newTraining) => {
    fetch('https://traineeapp.azurewebsites.net/api/trainings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTraining)
    })
      .then(response => {
        if (response.ok) {
          setAddTrainSnack(true);
        } else {
          alert('Something went wrong during the customer adding!');
        }
      })
      .catch(err => console.error(err))
  };

  const [columns, setColumns] = useState([
    { headerName: 'First name', field: 'firstname', sortable: true, filter: true, cellStyle: { 'text-align': 'left' }, width: 130 },
    { headerName: 'Last name', field: 'lastname', sortable: true, filter: true, cellStyle: { 'text-align': 'left' }, width: 130 },
    { field: 'email', sortable: true, filter: true, width: 250, cellStyle: { 'text-align': 'left' } },
    { field: 'phone', sortable: true, filter: true, width: 160, cellStyle: { 'text-align': 'left' } },
    { headerName: 'Address', field: 'streetaddress', sortable: true, filter: true, width: 180, cellStyle: { 'text-align': 'left' } },
    { field: 'postcode', sortable: true, filter: true, cellStyle: { 'text-align': 'left' }, width: 120 },
    { field: 'city', sortable: true, filter: true, cellStyle: { 'text-align': 'left' }, width: 150 },
    {
      headerName: '',
      width: 150,
      field: 'links.0.href',
      cellRenderer: paramss => <Addtraining paramss={paramss} addTraining={addTraining} />
    },
    {
      headerName: '',
      width: 100,
      field: 'links.0.href',
      cellRenderer: params => <Editcustomer params={params} updateCustomer={updateCustomer} />
    },
    {
      headerName: '',
      valueGetter: linkGetter,
      width: 100,
      cellRenderer: params =>
        <IconButton onClick={() => deleteCustomer(params.value)}>
          <DeleteIcon style={{ color: 'red' }} />
        </IconButton>
    }
  ]);

  return (
    <>
      <Stack spacing={2} direction="row">
        <Addcustomer addCustomer={addCustomer} />
        <Button variant="text" onClick={onBtnExport} style={{ marginBottom: 20 }}>Export</Button>
      </Stack>
      <div className="ag-theme-material" style={{ height: 500, width: '100%', margin: 'auto' }}>
        <AgGridReact
          ref={gridRef}
          columnDefs={columns}
          rowData={customers}
          pagination={true}
          paginationPageSize={5}
          suppressCellFocus={true}
          animateRows="true"
        />
      </div>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
        message='Customer was deleted successfully'
      />
      <Snackbar open={addCustomerSnack} autoHideDuration={3000} onClose={() => setAddCusSnack(false)}>
        <Alert onClose={() => setAddCusSnack(false)} severity="success" sx={{ width: '100%' }}>
          New customer was added successfully!
        </Alert>
      </Snackbar>
      <Snackbar open={editcustomerSnack} autoHideDuration={3000} onClose={() => setEdCusSnack(false)}>
        <Alert onClose={() => setEdCusSnack(false)} severity="success" sx={{ width: '100%' }}>
          Customer info was updated successfully!
        </Alert>
      </Snackbar>
      <Snackbar open={addTrainingSnack} autoHideDuration={3000} onClose={() => setAddTrainSnack(false)}>
        <Alert onClose={() => setAddTrainSnack(false)} severity="success" sx={{ width: '100%' }}>
          New training was added successfully!
        </Alert>
      </Snackbar>
    </>
  );
}

export default CustomerList;
