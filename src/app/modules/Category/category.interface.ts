import { Model } from "mongoose";

export interface ICategory {
  name: string;
  description: string;
  image_URL: string;
}

export type TCategoryModel = Model<ICategory, Record<string, unknown>>;

export type TCategoryFilterableFields = "searchTerm" | "name" | "description";

export type TCategoryFilters = {
  searchTerm?: string;
  name?: string;
  description?: string;
};
