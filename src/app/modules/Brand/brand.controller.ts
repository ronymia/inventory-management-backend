import httpStatus from "http-status";
import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { IBrand } from "./brand.interface";
import { BrandServices } from "./brand.service";
import pick from "../../shared/pick";
import { brandFilterableFields } from "./brand.constant";
import { paginationFields } from "../../constants/pagination";

const createBrand = catchAsync(async (req: Request, res: Response) => {
  const { ...BrandData } = req.body;

  const result = await BrandServices.createBrandIntoDB(BrandData);

  sendResponse<IBrand>(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Brand created successfully!",
    data: result,
  });
});

const getBrandById = catchAsync(async (req: Request, res: Response) => {
  const BrandId = req.params;

  const result = await BrandServices.getBrandByIdFromDB(BrandId);

  sendResponse<IBrand>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Brand retrieved successfully!",
    data: result,
  });
});

const getAllBrands = catchAsync(async (req: Request, res: Response) => {
  //   const { ...BrandData } = req.body;
  const filters = pick(req.query, brandFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await BrandServices.getAllBrandsFromDB(
    filters,
    paginationOptions
  );

  sendResponse<IBrand[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Brand fetch successfully!",
    meta: result.meta,
    data: result.data,
  });
});

const updateBrand = catchAsync(async (req: Request, res: Response) => {
  const BrandId = req.params;
  const { ...BrandData } = req.body;

  const result = await BrandServices.updateBrandIntoDB(BrandId, BrandData);

  sendResponse<IBrand>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Brand Updated successfully!",
    data: result,
  });
});

const deleteBrand = catchAsync(async (req: Request, res: Response) => {
  const BrandId = req.params;

  const result = await BrandServices.deleteBrandFromDB(BrandId);

  sendResponse<IBrand>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Brand Deleted successfully!",
    data: result,
  });
});

export const BrandControllers = {
  createBrand,
  getBrandById,
  getAllBrands,
  updateBrand,
  deleteBrand,
};
