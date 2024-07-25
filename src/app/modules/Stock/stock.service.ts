import { SortOrder } from "mongoose";
import { IStock, TStockFilters } from "./stock.interface";
import { Stock } from "./stock.model";
import { TPaginationOptions } from "../../interfaces/pagination";
import { TGenericResponse } from "../../interfaces/response";
import { paginationHelpers } from "../../helpers/paginationHelpers";
import { stockSearchableFields } from "./stock.constant";

const createStockIntoDB = async (payload: IStock): Promise<IStock> => {
  const result = await Stock.create(payload);

  return result;
};

const getStockByIdFromDB = async (id: string): Promise<IStock | null> => {
  const result = await Stock.findById(id);
  return result;
};

const getAllStocksFromDB = async (
  filters: TStockFilters,
  paginationOptions: TPaginationOptions
): Promise<TGenericResponse<IStock[]>> => {
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
      $or: stockSearchableFields.map((field) => ({
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
  const result = await Stock.find(whereCondition)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);

  // Getting total
  const total = await Stock.countDocument(whereCondition);
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

const updateStockIntoDB = async (
  id: string,
  payload: Partial<IStock>
): Promise<IStock | null> => {
  const result = await Stock.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });

  //
  return result;
};
const deleteStockFromDB = async (id: string): Promise<IStock | null> => {
  const result = await Stock.findByIdAndDelete(id);

  //
  return result;
};

export const StockServices = {
  createStockIntoDB,
  getStockByIdFromDB,
  getAllStocksFromDB,
  updateStockIntoDB,
  deleteStockFromDB,
};
