import { useState, useEffect, FC } from 'react';
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

import { format } from 'date-fns';

import { Snackbar, IconButton } from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';
import { Customer, TrainingWithCustomer } from '../types';

const apiUrl = 'https://traineeapp.azurewebsites.net';

const TrainingList: FC = () => {
    const [trainings, setTrainings] = useState<TrainingWithCustomer[]>([]);
    const [trainingDeleted, setTrainingDeleted] = useState<boolean>(false);

    useEffect((): void => {
        fetchTrainings();
    }, []);

    type NameGetterParams = {
        data: {
            customer: Customer;
        };
    }

    type DateGetterParams = {
        data: {
            date: Date;
        };
    }

    type LinkGetterParams = {
        data: {
            id: number;
        };
    }

    const nameValueGetter = (params: NameGetterParams) => {
        return params.data.customer.firstname + ' ' + params.data.customer.lastname;
    }

    const dateValueGetter = (params: DateGetterParams) => {
        return format(new Date(params.data.date), "dd.MM.yyyy' 'hh:mm' 'aaa");
    }

    const linkGetter = (params: LinkGetterParams) => {
        return `${apiUrl}/api/trainings/${params.data.id}`;
    }

    const fetchTrainings = async (): Promise<void> => {
        try {
            const response: Response = await fetch(`${apiUrl}/gettrainings`);
            if (response.ok) {
                const data: TrainingWithCustomer[] = await response.json();
                setTrainings(data);
            } else {
                alert('Something went wrong');
            }
        } catch (err) {
            console.error(err);
        }
    }

    const deleteTraining = async (link: string): Promise<void> => {
        if (window.confirm('Are you sure you want to delete this training?')) {
            try {
                const response: Response = await fetch(link, { method: 'DELETE' });
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

    type DeleteParams = {
        value: string;
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
            cellRenderer: (params: DeleteParams): JSX.Element =>
                <IconButton onClick={(): Promise<void> => deleteTraining(params.value)}>
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
                    animateRows
                />
            </div>
            <Snackbar
                open={trainingDeleted}
                autoHideDuration={4000}
                onClose={(): void => setTrainingDeleted(false)}
                message='Training was deleted successfully'
            />
        </>
    );
}

export default TrainingList;
