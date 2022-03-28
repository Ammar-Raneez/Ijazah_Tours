import { Timestamp } from 'firebase/firestore';

export type Order = 'asc' | 'desc';
export type Status = 'ACTIVE' | 'INACTIVE';

export interface SettingsRoomProperties {
  val: string;
  checked?: boolean;
  createdAt: string,
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

export interface SettingsSingleInput {
  id: string;
  val: string;
}

export interface AccomodationRate {
  id: string;
  newRateStart: string;
  newRateEnd: string;
  newMealPlan: string;
  newSinglePrice: string;
  newDoublePrice: string;
  newTriplePrice: string;
}

export interface RadioButtonOption {
  value: string;
  label: string;
}

export interface QuoteHeadCell {
  id: string;
  label: string;
}

export interface LibraryHeadCell {
  id: string;
  label: string;
}

export interface LibraryAccomodation {
  id: string;
  name: string;
  tel: string;
  city: string;
  country: string;
  group: string;
  email: string;
  webLink: string;
  ijazahLink: string;
  views: SettingsRoomProperties[];
  gradings: SettingsRoomProperties[];
  rates: AccomodationRate[];
  categoryValues: { [k: string]: string; };
}

export interface LibraryDriver {
  id: string;
  name: string;
  nic: string;
  tel: string;
  rate: string;
  boardCertNum: string;
  vehicleType: string;
  status: Status;
  email: string;
  address: string;
  notes: string;
  languages: boolean[];
  insurance: any;
  profilePic: any;
  vehiclePic: any;
}

export interface LibraryGuest {
  id: string;
  name: string;
  refNum: string;
  tel: string;
  country: string;
  status: Status;
  occupation: string;
  city: string;
  email: string;
  adults: number;
  rooms: number;
  childrenAges: number[];
  passport: any;
}
