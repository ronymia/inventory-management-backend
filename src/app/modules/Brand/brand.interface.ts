import { Model, Types } from 'mongoose';
import { IProduct } from '../Product/product.interface';
import { ISupplier } from '../Supplier/supplier.interface';

// BRAND STATUS ENUM
export enum STATUS {
  ACTIVE = 'active',
  IN_ACTIVE = 'inactive',
}

// BRAND STATUS TYPE
export type TStatus = STATUS.ACTIVE | STATUS.IN_ACTIVE;

// BRAND INTERFACE
export interface IBrand {
  name: string;
  description: string;
  email: string;
  website: string;
  address: string;
  products: Types.ObjectId[] | IProduct[];
  suppliers: {
    name: string;
    phoneNumber: number;
    id: Types.ObjectId[] | ISupplier[];
  };
  status: TStatus;
}

// BRAND MODEL FOR CUSTOM METHOD
export type TBrandModel = Model<IBrand, Record<string, unknown>>;

//BRAND FILTERABLE FIELDS
export type TBrandFilters = {
  searchTerm?: string;
  name?: string;
  email?: string;
  website?: string;
  location?: string;
  //suppliers?: [Types.ObjectId] | ISupplier[];
  status?: TStatus;
};

//BRAND FILTERABLE FIELDS
export type TBrandFilterableFields =
  | 'searchTerm'
  | 'name'
  | 'email'
  | 'website'
  | 'location'
  | 'status';
