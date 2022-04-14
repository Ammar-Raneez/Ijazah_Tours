import { Timestamp } from 'firebase/firestore';

export type Order = 'asc' | 'desc';
export type Status = 'ACTIVE' | 'INACTIVE';
export type CustomerQuoteStatus = 'APPROVED' | 'IN PROGRESS' | 'COMPLETE';
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

// Quotations
export interface CustomerQuotation {
  id: string;
  refNum: string;
  quoteTitle: string;
  name: string;
  profilePic: string;
  pdfURL: string;
  netPrice: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  status: CustomerQuoteStatus;
}

export interface QuotationCostingRate {
  id: string;
  date: string;
  accomodation: string;
  bookingEngine: string;
  rate: string;
}

// Library
export interface AccomodationRate {
  id: string;
  newRateStart: string;
  newRateEnd: string;
  newMealPlan: string;
  newSinglePrice: string;
  newDoublePrice: string;
  newTriplePrice: string;
}
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
export interface UserAccomodation extends LibraryAccomodation {
  nights: string;
  pax: string;
  mealPlan: string;
  roomType: string;
  roomRate: string;
  total: string;
}
