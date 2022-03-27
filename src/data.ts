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

export const QUOTATIONS_REFERENCE_DATA = [
  { label: '01', value: '01' },
  { label: '02', value: '02' },
  { label: '03', value: '03' },
  { label: '04', value: '04' },
  { label: '05', value: '05' },
];

export const QUOTATIONS_LOCATION_DATA = [
  { label: 'Colombo', value: 'Colombo' },
  { label: 'Kandy', value: 'Kandy' },
  { label: 'Nuwera Eliya', value: 'Nuwera Eliya' },
  { label: 'Galle', value: 'Galle' },
  { label: 'Bentota', value: 'Bentota' },
];

export const QUOIATIONS_ACCOMODATION_DATA = [
  { label: 'Colombo Hotel', value: 'Colombo Hotel', location: 'Colombo' },
  { label: 'Kandy Hotel', value: 'Kandy Hotel', location: 'Kandy' },
  { label: 'Nuwera Eliya Hotel', value: 'Nuwera Eliya Hotel', location: 'Nuwera Eliya' },
  { label: 'Galle Hotel', value: 'Galle Hotel', location: 'Galle' },
  { label: 'Bentota Hotel', value: 'Bentota Hotel', location: 'Bentota' },
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
