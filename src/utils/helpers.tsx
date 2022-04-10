import { User } from 'firebase/auth';
import { collection, getDocs } from 'firebase/firestore';
import {
  FirebaseStorage,
  getDownloadURL,
  ref,
  uploadBytes,
  uploadString,
} from 'firebase/storage';
import { v4 as uuid } from 'uuid';

import { db } from '../firebase';
import { Order } from './types';

export function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

export function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (a: any, b: any) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

export function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

export const widthHeightDynamicStyle = (
  value: number,
  threshold: number,
  ifTrue: string | number | undefined,
  ifFalse: string | number | undefined,
) => (value < threshold ? ifTrue : ifFalse);

export const uploadImage = async (storage: FirebaseStorage, container: string, pic: string, filepath: string) => {
  const randomString = uuid();
  const storageRef = ref(storage, `${container}/${randomString + filepath}`);
  await uploadString(storageRef, pic, 'data_url');
  return getDownloadURL(storageRef);
};

export const uploadPDF = async (storage: FirebaseStorage, container: string, pdf: Blob, filepath: string) => {
  const storageRef = ref(storage, `${container}/${filepath}`);
  await uploadBytes(storageRef, pdf, {
    contentType: 'application/pdf',
  });

  return getDownloadURL(storageRef);
};

export const getUserOnLogin = async (user: User) => {
  const userData = (await getDocs(collection(db, `Team Members`)))
    .docs.find((doc) => doc.get('email') === user.email);
  const data = userData!.data();
  const { id } = userData!;
  data.id = id;
  return data;
};

export const searchData = (search: string, initialData: any, setter: any) => {
  if (search) {
    const filteredData: any[] = [];

    initialData?.forEach((each: any) => {
      if ((each?.name?.toLowerCase().includes(search.toLowerCase()))) {
        filteredData.push(each);
      }
    });

    setter(filteredData);
  } else {
    setter(initialData);
  }
};

export const getDaysDifference = (a: string, b: string) => {
  const dateA = new Date(a);
  const dateB = new Date(b);
  const difference = dateA.getTime() - dateB.getTime();
  return Math.ceil(difference / (1000 * 3600 * 24));
};

export const statusOptions = [
  { label: 'ACTIVE', value: 'ACTIVE' },
  { label: 'INACTIVE', value: 'INACTIVE' },
];

export const vehicleOptions = [
  { label: 'Nissan', value: 'Nissan' },
  { label: 'Suzuki', value: 'Suzuki' },
  { label: 'BMW', value: 'BMW' },
];

export const mealPlanOptions = [
  { label: 'BB', value: 'BB' },
  { label: 'FB', value: 'FB' },
  { label: 'HB', value: 'HB' },
];

export const dateTypeOptions = [
  { label: 'Specific Dates', value: 'specific-dates' },
  { label: 'Not Specific', value: 'not-specific' },
];
