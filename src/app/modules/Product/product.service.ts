import mongoose, { SortOrder } from 'mongoose';
import { paginationHelpers } from '../../helpers/paginationHelpers';
import { TGenericResponse } from '../../interfaces/response';
import { IProduct, TProductFilters } from './product.interface';
import { TPaginationOptions } from '../../interfaces/pagination';
import { productSearchableFields } from './product.constant';
import { Product } from './product.model';
import { Brand } from '../Brand/brand.model';

const createProductIntoDB = async (payload: IProduct): Promise<IProduct> => {
  const result = (await Product.create(payload)).populate(
    path: 'brand',
    populate: [{
      path:'products'
    }]
  );
  const updateProductOnBrand = await Brand.findByIdAndUpdate(payload.brand, {
    $push: { products: result._id },
  });

  // const session = await mongoose.startSession();
  // session.startTransaction();

  // try {
  //   // Create a new product within the transaction
  //   const newProduct = await Product.create([payload], { session });
  //   const product = newProduct[0]; // Since create with an array returns an array

  //   // Update the brand with the new product ID within the transaction
  //   await Brand.findByIdAndUpdate(
  //     payload?.brand,
  //     { $push: { products: product._id } },
  //     { session },
  //   );

  //   // Commit the transaction
  //   await session.commitTransaction();
  //   session.endSession();

  //   return product;
  // } catch (error) {
  //   // Abort the transaction in case of error
  //   await session.abortTransaction();
  //   session.endSession();
  //   throw error;
  // }
};

//
const getProductByIdFromDB = async (
  payload: string,
): Promise<IProduct | null> => {
  const product = await Product.findById(payload);
  return product;
};

const getAllProductsFromDB = async (
  filters: TProductFilters,
  paginationOptions: TPaginationOptions,
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
          $options: 'i',
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
  const total = await Product.countDocuments(whereCondition);
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
  payload: Partial<IProduct>,
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
