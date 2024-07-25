import {
  TStockFilterableFields,
  TStockStatus,
  TStockUnit,
} from "./stock.interface";

export const stockUnit: TStockUnit[] = ["kg", "litre", "pcs", "bag"];

export const stockStatus: TStockStatus[] = [
  "in-stock",
  "out-of-stock",
  "discontinued",
];

export const stockFilterableFields: TStockFilterableFields[] = [
  "searchTerm",
  "name",
  "price",
  "quantity",
  "unit",
  "status",
];
export const stockSearchableFields: TStockFilterableFields[] = [
  "name",
  "price",
  "quantity",
  "unit",
  "status",
];
