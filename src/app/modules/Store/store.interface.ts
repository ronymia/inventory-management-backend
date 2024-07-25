import { Types, Model } from "mongoose";

export type TStoreName =
  | "Dhaka"
  | "Rajshahi"
  | "Chattogram"
  | "Khulna"
  | "Barishal"
  | "Faridpur"
  | "Kustia"
  | "Sylhet";

export enum STORE_STATUS {
  ACTIVE = "active",
  INACTIVE = '"inactive"',
}

export type TStoreStatus = STORE_STATUS.ACTIVE | STORE_STATUS.INACTIVE;

// STORE INTERFACE
export type IStore = {
  name: TStoreName;
  description: string;
  status: TStoreStatus;
  manager: Types.ObjectId | IManager;
};

export type TStoreModel = Model<IStore, {}>;

export type TStoreFilters = {
  searchTerm?: string;
  name?: string;
  status?: string;
  //   manager: Types.ObjectId | IManager;
};

export type TStoreFilterableFields = "searchTerm" | "name" | "status";
