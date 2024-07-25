import { SortOrder } from "mongoose";
import { paginationHelpers } from "../../helpers/paginationHelpers";
import { TGenericResponse } from "../../interfaces/response";
import { IProduct, TProductFilters } from "./product.interface";
import { TPaginationOptions } from "../../interfaces/pagination";
import { productSearchableFields } from "./product.constant";

const createProductIntoDB = async (payload: IProduct): Promise<IProduct> => {
  const product = Product.create(payload);
  return product;
};
const getProductByIdFromDB = async (
  payload: string
): Promise<IProduct | null> => {
  const product = await Product.findById(payload);
  return product;
};

const getAllProductsFromDB = async (
  filters: TProductFilters,
  paginationOptions: TPaginationOptions
): Promise<TGenericResponse<IProduct[]>> => {
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
      $or: productSearchableFields.map((field) => ({
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
  const result = await Product.find(whereCondition)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);

  // Getting total
  const total = await Product.countDocument(whereCondition);
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
const updateProductIntoDB = async (
  id: string,
  payload: Partial<IProduct>
): Promise<IProduct> => {
  const result = await Product.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const deleteProductFromDB = async (id: string): Promise<IProduct> => {
  const result = await Product.findByIdAndDelete(id);
  return result;
};

export const ProductServices = {
  createProductIntoDB,
  getProductByIdFromDB,
  getAllProductsFromDB,
  updateProductIntoDB,
  deleteProductFromDB,
};
