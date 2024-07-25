import { SortOrder } from "mongoose";
import { IBrand, TBrandFilters } from "./brand.interface";
import { Brand } from "./brand.model";
import { TPaginationOptions } from "../../interfaces/pagination";
import { TGenericResponse } from "../../interfaces/response";
import { paginationHelpers } from "../../helpers/paginationHelpers";
import { brandSearchableFields } from "./brand.constant";

const createBrandIntoDB = async (payload: IBrand): Promise<IBrand> => {
  const result = await Brand.create(payload);

  return result;
};

const getBrandByIdFromDB = async (id: string): Promise<IBrand | null> => {
  const result = await Brand.findById(id);
  return result;
};

const getAllBrandsFromDB = async (
  filters: TBrandFilters,
  paginationOptions: TPaginationOptions
): Promise<TGenericResponse<IBrand[]>> => {
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
      $or: brandSearchableFields.map((field) => ({
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
  const result = await Brand.find(whereCondition)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);

  // Getting total
  const total = await Brand.countDocument(whereCondition);
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

const updateBrandIntoDB = async (
  id: string,
  payload: Partial<IBrand>
): Promise<IBrand | null> => {
  const result = await Brand.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });

  //
  return result;
};
const deleteBrandFromDB = async (id: string): Promise<IBrand | null> => {
  const result = await Brand.findByIdAndDelete(id);

  //
  return result;
};

export const BrandServices = {
  createBrandIntoDB,
  getBrandByIdFromDB,
  getAllBrandsFromDB,
  updateBrandIntoDB,
  deleteBrandFromDB,
};
