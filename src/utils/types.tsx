import { Timestamp } from 'firebase/firestore';

export type Order = 'asc' | 'desc';
export type Status = 'ACTIVE' | 'INACTIVE';

export interface LibraryHeadCell {
  id: string;
  label: string;
}

export interface AccomodationRate {
  newRateStart: string;
  newRateEnd: string;
  newMealPlan: string;
  newSinglePrice: string;
  newDoublePrice: string;
  newTriplePrice: string;
}

export interface AccomodationTableRow {
  name: string;
  tel: string;
  city: string;
  country: string;
  group: string;
}

export interface DriverTableRow {
  id: string;
  name: string;
  nic: string;
  tel: string;
  rate: string;
  boardCertNum: string;
  vehicleType: string;
  status: Status;
}

export interface GuestTableRow {
  id: string;
  name: string;
  refNum: string;
  tel: string;
  country: string;
  status: Status;
}

export interface SettingsLocation {
  id: string;
  title: string;
  city: string;
}

export interface SettingsReminder {
  id: string;
  title: string;
  description: string;
  type: string;
}

export interface SettingsTeamMember {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: Timestamp,
  role: string;
  status: Status;
}
