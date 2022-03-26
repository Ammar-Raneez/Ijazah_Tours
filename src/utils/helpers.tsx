import {
  FirebaseStorage,
  getDownloadURL,
  ref,
  uploadString,
} from 'firebase/storage';
import { v4 as uuid } from 'uuid';

export function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

export type Order = 'asc' | 'desc';

export function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
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

export const statusOptions = [
  { label: 'ACTIVE', value: 'ACTIVE' },
  { label: 'INACTIVE', value: 'INACTIVE' },
];

export const vehicleOptions = [
  { label: 'Nissan', value: 'Nissan' },
  { label: 'Suzuki', value: 'Suzuki' },
  { label: 'BMW', value: 'BMW' },
];

export const uploadImage = async (storage: FirebaseStorage, container: string, pic: any, filepath: string) => {
  const randomString = uuid();
  const storageRef = ref(storage, `${container}/${randomString + filepath}`);
  await uploadString(storageRef, pic, 'data_url');
  return getDownloadURL(storageRef);
};
