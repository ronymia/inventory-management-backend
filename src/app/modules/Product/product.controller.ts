import httpStatus from "http-status";
import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import { ProductServices } from "./product.service";
import sendResponse from "../../shared/sendResponse";
import { IProduct } from "./product.interface";
import pick from "../../shared/pick";
import { paginationFields } from "../../constants/pagination";
import { productFilterableFields } from "./product.constant";

const createProduct = catchAsync(async (req: Request, res: Response) => {
  const { ...productData } = req.body;
  const result = await ProductServices.createProductIntoDB(productData);

  sendResponse<IProduct>(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Product created Successfully",
    data: result,
  });
});

const getProductById = catchAsync(async (req: Request, res: Response) => {
  const result = await ProductServices.getProductByIdFromDB(req.params);

  sendResponse<IProduct>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product retrieved Successfully",
    data: result,
  });
});

const getAllProducts = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, productFilterableFields);
  const paginationOPtions = pick(req.query, paginationFields);

  const result = await ProductServices.getAllProductsFromDB(
    filters,
    paginationOPtions
  );

  sendResponse<IProduct[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Products fetch Successfully",
    meta: result.meta,
    data: result.data,
  });
});

const updateProduct = catchAsync(async (req: Request, res: Response) => {
  const { productId } = req.params;
  const { ...productData } = req.body;
  const result = await ProductServices.updateProductIntoDB(
    productId,
    productData
  );

  sendResponse<IProduct>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product Updated Successfully",
    data: result,
  });
});

const deleteProduct = catchAsync(async (req: Request, res: Response) => {
  const productId = req.params;

  const result = await ProductServices.deleteProductFromDB(productId);

  sendResponse<IProduct>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product delete successfully!",
    data: result,
  });
});

export const ProductControllers = {
  createProduct,
  getProductById,
  getAllProducts,
  updateProduct,
  deleteProduct,
};
