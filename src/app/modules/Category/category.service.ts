import { SortOrder } from "mongoose";
import { paginationHelpers } from "../../helpers/paginationHelpers";
import { TPaginationOptions } from "../../interfaces/pagination";
import { TGenericResponse } from "../../interfaces/response";
import { categorySearchableFields } from "./category.constant";
import { ICategory, TCategoryFilters } from "./category.interface";
import { Category } from "./category.model";

const createCategoryIntoDB = async (payload: ICategory): Promise<ICategory> => {
  const result = await Category.create(payload);

  return result;
};

const getCategoryByIdFromDB = async (id: string): Promise<ICategory | null> => {
  const result = await Category.findById(id);
  return result;
};

const getAllCategoriesFromDB = async (
  filters: TCategoryFilters,
  paginationOptions: TPaginationOptions
): Promise<TGenericResponse<ICategory[]>> => {
  // Extract pagination option to implement pagination
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  //Dynamic sorts need field to do sorting
  const sortCondition: { [keyOf: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder;
  }

  // Extract searchTerm to implement search query
  const { searchTerm, ...filtersData } = filters;

  // search and filter conditions
  const andConditions = [];

  //Search needs $or  for search in specified fields
  if (searchTerm) {
    andConditions.push({
      $or: categorySearchableFields.map((field) => ({
        [field]: {
          $regex: searchTerm,
          $options: "i",
        },
      })),
    });
  }

  // Filters  needs $and to full fill all the conditions
  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  // IF there is no condition , put {} to give all data
  const whereCondition = andConditions.length ? { $and: andConditions } : {};

  //database query
  const result = await Category.find(whereCondition)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);

  // Getting total
  const total = await Category.countDocument(whereCondition);
  const totalPage = Math.ceil(total / limit);

  //
  return {
    meta: {
      page,
      limit,
      total,
      totalPage,
    },
    data: result,
  };
};

const updateCategoryIntoDB = async (
  id: string,
  payload: Partial<ICategory>
): Promise<ICategory | null> => {
  const result = await Category.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });

  //
  return result;
};
const deleteCategoryFromDB = async (id: string): Promise<ICategory | null> => {
  const result = await Category.findByIdAndDelete(id);

  //
  return result;
};

export const CategoryServices = {
  createCategoryIntoDB,
  getCategoryByIdFromDB,
  getAllCategoriesFromDB,
  updateCategoryIntoDB,
  deleteCategoryFromDB,
};
