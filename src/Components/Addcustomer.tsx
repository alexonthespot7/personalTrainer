import { ChangeEvent, FC, useState } from 'react';

import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Snackbar, } from '@mui/material';

import AddIcon from '@mui/icons-material/Add';

import { Customer } from '../types';

const initialCustomerState: Customer = {
  firstname: '',
  lastname: '',
  email: '',
  phone: '',
  streetaddress: '',
  postcode: '',
  city: ''
}

interface AddcustomerProps {
  addCustomer: (newCustomer: Customer) => Promise<void>;
}

const Addcustomer: FC<AddcustomerProps> = ({ addCustomer }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [customer, setCustomer] = useState<Customer>(initialCustomerState);

  const handleClickOpen = (): void => {
    setOpen(true);
  }

  const handleClose = (): void => {
    setOpen(false);
  }

  const inputChanged = (event: ChangeEvent<HTMLInputElement>): void => {
    setCustomer({ ...customer, [event.target.name]: event.target.value });
  }

  const handleSave = (): void => {
    for (const key of Object.keys(customer)) {
      if (customer[key] === '') {
        setError(`${key} is mandatory`);
        return;
      }
    }

    addCustomer(customer);
    setCustomer(initialCustomerState);
    setOpen(false);
  }

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen} style={{ marginBottom: 20 }}>
        <AddIcon color="inherit" />
        Customer
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New customer</DialogTitle>
        <DialogContent>
          {Object.keys(initialCustomerState).map((field: string): JSX.Element => (
            <TextField
              key={field}
              margin="dense"
              name={field}
              value={customer[field]}
              onChange={inputChanged}
              label={field.charAt(0).toUpperCase() + field.slice(1)}
              fullWidth
              variant="standard"
            />
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={error !== ''}
        autoHideDuration={3000}
        onClose={(): void => setError('')}
        message={error}
      />
    </div>
  );
}

export default Addcustomer;