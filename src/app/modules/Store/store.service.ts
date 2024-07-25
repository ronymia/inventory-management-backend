import { SortOrder } from "mongoose";
import { IStore, TStoreFilters } from "./store.interface";
import { Store } from "./store.model";
import { TPaginationOptions } from "../../interfaces/pagination";
import { TGenericResponse } from "../../interfaces/response";
import { paginationHelpers } from "../../helpers/paginationHelpers";
import { storeSearchableFields } from "./store.constant";

const createStoreIntoDB = async (payload: IStore): Promise<IStore> => {
  const result = await Store.create(payload);

  return result;
};

const getStoreByIdFromDB = async (id: string): Promise<IStore | null> => {
  const result = await Store.findById(id);
  return result;
};

const getAllStoresFromDB = async (
  filters: TStoreFilters,
  paginationOptions: TPaginationOptions
): Promise<TGenericResponse<IStore[]>> => {
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
      $or: storeSearchableFields.map((field) => ({
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
  const result = await Store.find(whereCondition)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);

  // Getting total
  const total = await Store.countDocument(whereCondition);
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

const updateStoreIntoDB = async (
  id: string,
  payload: Partial<IStore>
): Promise<IStore | null> => {
  const result = await Store.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });

  //
  return result;
};
const deleteStoreFromDB = async (id: string): Promise<IStore | null> => {
  const result = await Store.findByIdAndDelete(id);

  //
  return result;
};

export const StoreServices = {
  createStoreIntoDB,
  getStoreByIdFromDB,
  getAllStoresFromDB,
  updateStoreIntoDB,
  deleteStoreFromDB,
};
