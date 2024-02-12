export type Category = 'Customers' | 'Trainings' | 'Calendar' | 'Statistics';

export type Customer = {
    [key: string]: string;
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
    streetaddress: string;
    postcode: string;
    city: string;
};

export type Activity = 'Jogging' | 'Boxing' | 'Cycling' | 'Walking' | 'Gym training' | 'Spinning' | 'Zumba';

export type Training = {
    [key: string]: any;
    date: any | '',
    activity: Activity | '',
    duration: number | '',
    customer: string,
}
