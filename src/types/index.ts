export type Category = 'Customers' | 'Trainings' | 'Calendar' | 'Statistics';

export interface Customer {
    [key: string]: string | number;
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
    streetaddress: string;
    postcode: string;
    city: string;
}

export interface CustomerWithId extends Customer {
    id: number;
}

export type Activity = 'Jogging' | 'Boxing' | 'Cycling' | 'Walking' | 'Gym training' | 'Spinning' | 'Zumba';

interface BaseTraining {
    [key: string]: Date | Activity | number | string | CustomerWithId | null;
    date: Date | null,
    activity: Activity | '',
    duration: number | '',
}

export interface Training extends BaseTraining {
    customer: string,
}

export interface TrainingWithCustomer extends BaseTraining {
    customer: CustomerWithId,
}

export type TrainingParams = {
    data: Customer;
    value: string;
}


