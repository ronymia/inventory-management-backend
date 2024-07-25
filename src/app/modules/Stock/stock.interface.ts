import { Model, Types } from 'mongoose';
import { IProduct } from '../Product/product.interface';
import { ICategory } from '../Category/category.interface';
import { IBrand } from '../Brand/brand.interface';
import { IStore } from '../Store/store.interface';
import { ISupplier } from '../Supplier/supplier.interface';

export type TStockUnit = 'kg' | 'litre' | 'pcs' | 'bag';

export type TStockStatus = 'in-stock' | 'out-of-stock' | 'discontinued';

export type IStock = {
  productId: Types.ObjectId | IProduct;
  name: string;
  description: string;
  unit: TStockUnit;
  imageURLs: string[];
  price: number;
  quantity: number;
  status: TStockStatus;
  category: Types.ObjectId | ICategory;
  brand: Types.ObjectId | IBrand;
  store: Types.ObjectId | IStore;
  suppliedBy: Types.ObjectId | ISupplier;
};

export type TStockModel = Model<IStock, Record<string, never>>;

export type TStockFilters = {
  searchTerm?: string;
  name?: string;
  unit?: string;
  price?: number;
  quantity?: number;
  status?: string;
};

export type TStockFilterableFields =
  | 'searchTerm'
  | 'name'
  | 'unit'
  | 'price'
  | 'quantity'
  | 'status';
