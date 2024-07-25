import { TProductFilterableFields, TUnit } from "./product.interface";

export const unit: TUnit[] = ["kg", "litre", "pcs", "bag"];

export const productFilterableFields: TProductFilterableFields[] = [
  "searchTerm",
  "name",
];
export const productSearchableFields: TProductFilterableFields[] = ["name"];
