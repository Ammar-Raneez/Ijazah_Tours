import { Timestamp } from 'firebase/firestore';

export type Order = 'asc' | 'desc';
export type Status = 'ACTIVE' | 'INACTIVE';
export type NavbarType = 'quote' | 'library' | 'settings';
export type FlexDirection = 'column' | 'row' | 'row-reverse' | 'column-reverse';
export type JustifyContent = 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  profileImg: string;
  contactNumber: string,
  whatsApp: string,
  title: string,
  role: string;
  email: string;
  status: string;
}

// Settings
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

// Quotations
export interface QuotationAccomodation {
  id: string;
  location: string;
  nights: string;
  category: string;
  accomodation: string;
  pax: string;
  roomType: string;
  mealPlan: string;
  city: string;
}

export interface QuotationCostingAccomodation extends QuotationAccomodation {
  roomRate: string;
  total: string;
}

export interface QuotationCostingRate {
  id: string;
  date: string;
  accomodation: string;
  bookingEngine: string;
  rate: string;
}

// Library
export interface LibraryAccomodation {
  id: string;
  name: string;
  tel: string;
  accomodationType: string;
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

// Utilities
interface Option {
  value: string;
  label: string;
}

interface TableHeadCell {
  id: string;
  label: string;
}

export interface RadioButtonOption extends Option {}
export interface DropdownOption extends Option {}
export interface QuoteHeadCell extends TableHeadCell {}
export interface LibraryHeadCell extends TableHeadCell {}
