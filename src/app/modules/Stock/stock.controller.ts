import httpStatus from "http-status";
import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import { StockServices } from "./stock.service";
import sendResponse from "../../shared/sendResponse";
import { IStock } from "./stock.interface";
import pick from "../../shared/pick";
import { stockFilterableFields } from "./stock.constant";
import { paginationFields } from "../../constants/pagination";

const createStock = catchAsync(async (req: Request, res: Response) => {
  const { ...StockData } = req.body;

  const result = await StockServices.createStockIntoDB(StockData);

  sendResponse<IStock>(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Stock created successfully!",
    data: result,
  });
});

const getStockById = catchAsync(async (req: Request, res: Response) => {
  const stockId = req.params;

  const result = await StockServices.getStockByIdFromDB(stockId);

  sendResponse<IStock>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Stock retrieved successfully!",
    data: result,
  });
});

const getAllStocks = catchAsync(async (req: Request, res: Response) => {
  //   const { ...StockData } = req.body;
  const filters = pick(req.query, stockFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await StockServices.getAllStocksFromDB(
    filters,
    paginationOptions
  );

  sendResponse<IStock[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Stock fetch successfully!",
    meta: result.meta,
    data: result.data,
  });
});

const updateStock = catchAsync(async (req: Request, res: Response) => {
  const stockId = req.params;
  const { ...StockData } = req.body;

  const result = await StockServices.updateStockIntoDB(stockId, StockData);

  sendResponse<IStock>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Stock Updated successfully!",
    data: result,
  });
});

const deleteStock = catchAsync(async (req: Request, res: Response) => {
  const stockId = req.params;

  const result = await StockServices.deleteStockFromDB(stockId);

  sendResponse<IStock>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Stock Deleted successfully!",
    data: result,
  });
});

export const StockControllers = {
  createStock,
  getStockById,
  getAllStocks,
  updateStock,
  deleteStock,
};
