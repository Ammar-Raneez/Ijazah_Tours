export const QUOTATIONS_DATA = [
  {
    image: require('./assets/logo.png'),
    title: 'Brad Simmons',
    earning: '$2500',
    commission: '$520',
    status: 'Approved',
  },
  {
    image: require('./assets/logo.png'),
    title: 'Grad Simmons',
    earning: '$250',
    commission: '$52',
    status: 'In Progress',
  },
  {
    image: require('./assets/logo.png'),
    title: 'Ab Simmons',
    earning: '$25000',
    commission: '$5200',
    status: 'Approved',
  },
  {
    image: require('./assets/logo.png'),
    title: 'Bret Simmons',
    earning: '$2500',
    commission: '$520',
    status: 'Approved',
  },
  {
    image: require('./assets/logo.png'),
    title: 'Craig Simmons',
    earning: '$2500',
    commission: '$520',
    status: 'Approved',
  },
  {
    image: require('./assets/logo.png'),
    title: 'Me Simmons',
    earning: '$2500',
    commission: '$520',
    status: 'Approved',
  },
];

export const QUOTATIONS_ACCOMODATION_DATA = [
  {
    id: '1',
    location: 'L1',
    nights: '2',
    category: 'Hotel',
    accomodation: 'Hilton',
    pax: 'Single',
    roomType: 'Diluxe',
    mealPlan: 'FB',
    city: 'Colombo',
  },
  {
    id: '2',
    location: 'L1',
    nights: '2',
    category: 'Hotel',
    accomodation: 'Hilton',
    pax: 'Single',
    roomType: 'Mega',
    mealPlan: 'FB',
    city: 'Colombo',
  },
  {
    id: '3',
    location: 'L1',
    nights: '2',
    category: 'Hotel',
    accomodation: 'Hilton',
    pax: 'Single',
    roomType: 'Suite',
    mealPlan: 'FB',
    city: 'Colombo',
  },
];

export const QUOTATIONS_COSTING_ACCOMODATION_DATA = [
  {
    location: 'L1',
    nights: '2',
    category: 'Hotel',
    accomodation: 'Hilton',
    pax: 'Single',
    roomType: 'Diluxe',
    mealPlan: 'FB',
    city: 'Colombo',
    roomRate: '$70',
    total: '$140',
  },
  {
    location: 'L1',
    nights: '2',
    category: 'Hotel',
    accomodation: 'Hilton',
    pax: 'Single',
    roomType: 'Mega',
    mealPlan: 'FB',
    city: 'Colombo',
    roomRate: '$70',
    total: '$140',
  },
  {
    location: 'L1',
    nights: '2',
    category: 'Hotel',
    accomodation: 'Hilton',
    pax: 'Single',
    roomType: 'Suite',
    mealPlan: 'FB',
    city: 'Colombo',
    roomRate: '$70',
    total: '$140',
  },
];

export const QUOTATIONS_COSTING_RATE_DATA = [
  {
    date: 'L1',
    accomodation: 'The Kingsbury Colombo',
    bookingEngine: 'https://booking.com',
    rate: '$90',
  },
  {
    date: 'L1',
    accomodation: 'The Kingsbury Colombo',
    bookingEngine: 'https://booking.com',
    rate: '$90',
  },
  {
    date: 'L1',
    accomodation: 'The Kingsbury Colombo',
    bookingEngine: 'https://booking.com',
    rate: '$90',
  },
];

export const DASHBOARD_TASK_DATA = [
  {
    id: '1',
    name: 'Create new ticket example',
    title: 'PGI 6 30 2019 Single 14 N',
    status: 'Q',
    subtasks: [
      {
        id: '11',
        title: 'Finish ticket update',
        status: 'TODO',
      },
      {
        id: '12',
        title: 'Finish ticket update',
        status: 'COMPLETE',
      },
      {
        id: '13',
        title: 'Finish ticket update',
        status: 'TODO',
      },
      {
        id: '14',
        title: 'Finish ticket update',
        status: 'TODO',
      },
    ],
  },
  {
    id: '2',
    name: 'Create quote for customer',
    title: '',
    status: 'A',
  },
  {
    id: '3',
    name: 'Finish ticket update',
    title: 'PGI 7 18 19 HB 10 Days',
    status: 'C',
  },
];
