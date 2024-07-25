import { STATUS, TBrandFilterableFields, TStatus } from './brand.interface';

export const status: TStatus[] = [STATUS.ACTIVE, STATUS.IN_ACTIVE] as const;

export const brandFilterableFields: TBrandFilterableFields[] = [
  'searchTerm',
  'name',
  'email',
  'website',
  'address',
  'status',
];
export const brandSearchableFields: TBrandFilterableFields[] = [
  'name',
  'email',
  'website',
  'address',
  'status',
];
