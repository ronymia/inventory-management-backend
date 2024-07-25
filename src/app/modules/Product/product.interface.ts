import { Model, Types } from 'mongoose';
import { IBrand } from '../Brand/brand.interface';
import { ICategory } from '../Category/category.interface';

// PRODUCT UNITS
export type TUnit = 'kg' | 'litre' | 'pcs' | 'bag';

// PRODUCT INTERFACE
export interface IProduct {
  name: string;
  description: string;
  unit: TUnit;
  imageURLs?: string[];
  category: Types.ObjectId | ICategory;
  brand: Types.ObjectId | IBrand;
}

//PRODUCT MODEL FOR CUSTOM METHOD
export type TProductModel = Model<IProduct, Record<string, never>>;

// PRODUCT FILTERS FIELDS
export type TProductFilters = {
  searchTerm?: string;
  name?: string;
  category?: Types.ObjectId;
  brand?: Types.ObjectId;
};

// PRODUCT FILTER AND SEARCH FIELD
export type TProductFilterableFields = 'searchTerm' | 'name';
