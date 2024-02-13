import { ChangeEvent, FC, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import { Snackbar } from '@mui/material';

import { Activity, Training, TrainingParams } from '../types';

const activities: Activity[] = ['Jogging', 'Boxing', 'Cycling', 'Walking', 'Gym training', 'Spinning', 'Zumba'];

interface AddtrainingProps {
    trainingParams: TrainingParams;
    addTraining: (newTraining: Training) => Promise<void>;
}

const Addtraining: FC<AddtrainingProps> = ({ trainingParams, addTraining }) => {
    const [open, setOpen] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const initialTrainingState: Training = {
        date: null,
        activity: '',
        duration: '',
        customer: trainingParams.value
    }

    const [training, setTraining] = useState<Training>(initialTrainingState);

    const handleClickOpen = (): void => {
        setOpen(true);
    }

    const handleClose = (): void => {
        setOpen(false);
        setTraining(initialTrainingState);
    }

    const inputChanged = (event: ChangeEvent<HTMLInputElement>): void => {
        setTraining({ ...training, [event.target.name]: event.target.value });
    }

    const handleChangeDate = (newValue: Date | null): void => {
        setTraining({ ...training, date: newValue });
    }

    const handleSave = (): void => {
        for (const key of Object.keys(training)) {
            if (training[key] === '') {
                setError(`${key} is mandatory`);
                return;
            }
        }
        addTraining(training);
        setTraining(initialTrainingState);
        setOpen(false);
    }

    return (
        <div>
            <Button variant="text" onClick={handleClickOpen}>
                ADD TRAINING
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add training ({trainingParams.data.firstname} {trainingParams.data.lastname})</DialogTitle>
                <DialogContent>
                    <Stack spacing={2} marginTop={2}>
                        <TextField
                            name="activity"
                            select
                            label="Activity"
                            value={training.activity}
                            onChange={inputChanged}
                        >
                            {activities.map((option: Activity): JSX.Element => (
                                <MenuItem key={option} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </TextField>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DateTimePicker
                                value={training.date}
                                onChange={handleChangeDate}
                                label="Date"
                                renderInput={(params: TextFieldProps): JSX.Element => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                        <TextField
                            type='number'
                            margin="dense"
                            name="duration"
                            value={training.duration}
                            onChange={inputChanged}
                            label="Duration (min)"
                            fullWidth
                            variant="standard"
                        />
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSave}>Save</Button>
                </DialogActions>
                <Snackbar
                    open={error !== ''}
                    autoHideDuration={3000}
                    onClose={(): void => setError('')}
                    message={error}
                />
            </Dialog>
        </div>
    );
}

export default Addtraining;