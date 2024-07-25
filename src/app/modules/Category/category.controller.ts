import httpStatus from "http-status";
import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { ICategory } from "./category.interface";
import { CategoryServices } from "./category.service";
import pick from "../../shared/pick";
import { categoryFilterableFields } from "./category.constant";
import { paginationFields } from "../../constants/pagination";

const createCategory = catchAsync(async (req: Request, res: Response) => {
  const { ...categoryData } = req.body;

  const result = await CategoryServices.createCategoryIntoDB(categoryData);

  sendResponse<ICategory>(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Category created successfully!",
    data: result,
  });
});
const getCategoryById = catchAsync(async (req: Request, res: Response) => {
  const categoryId = req.params;

  const result = await CategoryServices.getCategoryByIdFromDB(categoryId);

  sendResponse<ICategory>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Category retrieved successfully!",
    data: result,
  });
});

const getAllCategories = catchAsync(async (req: Request, res: Response) => {
  //   const { ...categoryData } = req.body;
  const filters = pick(req.query, categoryFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await CategoryServices.getAllCategoriesFromDB(
    filters,
    paginationOptions
  );

  sendResponse<ICategory[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Category created successfully!",
    meta: result.meta,
    data: result.data,
  });
});

const updateCategory = catchAsync(async (req: Request, res: Response) => {
  const categoryId = req.params;
  const { ...categoryData } = req.body;

  const result = await CategoryServices.updateCategoryIntoDB(
    categoryId,
    categoryData
  );

  sendResponse<ICategory>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Category updated successfully!",
    data: result,
  });
});

const deleteCategory = catchAsync(async (req: Request, res: Response) => {
  const categoryId = req.params;

  const result = await CategoryServices.deleteCategoryFromDB(categoryId);

  sendResponse<ICategory>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Category Deleted successfully!",
    data: result,
  });
});

export const CategoryControllers = {
  createCategory,
  getCategoryById,
  getAllCategories,
  updateCategory,
  deleteCategory,
};
