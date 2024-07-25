import { STATUS, TBrandFilterableFields, TStatus } from "./brand.interface";

export const status: TStatus[] = [STATUS.ACTIVE, STATUS.IN_ACTIVE];

export const brandFilterableFields: TBrandFilterableFields[] = [
  "searchTerm",
  "name",
  "email",
  "website",
  "location",
  "status",
];
export const brandSearchableFields: TBrandFilterableFields[] = [
  "name",
  "email",
  "website",
  "location",
  "status",
];
