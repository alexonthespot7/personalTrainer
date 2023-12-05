import { useState } from 'react';

import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Snackbar } from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';

const initialState = {
  firstname: '',
  lastname: '',
  email: '',
  phone: '',
  streetaddress: '',
  postcode: '',
  city: '',
}

function Editcustomer({ params, updateCustomer }) {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');
  const [customer, setCustomer] = useState(initialState);

  const handleClickOpen = () => {
    setCustomer({
      firstname: params.data.firstname,
      lastname: params.data.lastname,
      email: params.data.email,
      phone: params.data.phone,
      streetaddress: params.data.streetaddress,
      postcode: params.data.postcode,
      city: params.data.city
    });
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  const inputChanged = (event) => {
    setCustomer({ ...customer, [event.target.name]: event.target.value });
  }

  const handleSave = () => {
    for (const key of Object.keys(customer)) {
      if (customer[key] === '') {
        setError(`${key} is mandatory`);
        return null;
      }
    }

    updateCustomer(customer, params.value)
    setOpen(false);
  }

  return (
    <div>
      <IconButton onClick={handleClickOpen}>
        <EditIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit customer</DialogTitle>
        <DialogContent>
          {Object.entries(initialState).map(([name, label]) => (
            <TextField
              key={name}
              margin="dense"
              name={name}
              value={customer[name]}
              onChange={inputChanged}
              label={label}
              fullWidth
              variant="standard"
            />
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
        <Snackbar
          open={error !== ''}
          autoHideDuration={3000}
          onClose={() => setError('')}
          message={error}
        />
      </Dialog>
    </div>
  );
}

export default Editcustomer;