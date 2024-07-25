import {
  STORE_STATUS,
  TStoreFilterableFields,
  TStoreName,
  TStoreStatus,
} from "./store.interface";

export const storeName: TStoreName[] = [
  "Dhaka",
  "Rajshahi",
  "Chattogram",
  "Khulna",
  "Barishal",
  "Faridpur",
  "Kustia",
  "Sylhet",
];

export const storeStatus: TStoreStatus[] = [
  STORE_STATUS.ACTIVE,
  STORE_STATUS.INACTIVE,
];

export const storeFilterableFields: TStoreFilterableFields[] = [
  "searchTerm",
  "name",
  "status",
];

export const storeSearchableFields: TStoreFilterableFields[] = [
  "name",
  "status",
];
