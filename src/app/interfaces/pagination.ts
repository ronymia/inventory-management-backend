import { SortOrder } from 'mongoose';

export type TSortOrder = 'asc' | 'desc';

export type TPaginationOptions = {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: SortOrder;
};
