import httpStatus from 'http-status';
import { Request, Response } from 'express';
import catchAsync from '../../shared/catchAsync';
import { StoreServices } from './store.service';
import sendResponse from '../../shared/sendResponse';
import { IStore } from './store.interface';
import pick from '../../shared/pick';
import { storeFilterableFields } from './store.constant';
import { paginationFields } from '../../constants/pagination';

const createStore = catchAsync(async (req: Request, res: Response) => {
  const { ...StoreData } = req.body;

  const result = await StoreServices.createStoreIntoDB(StoreData);

  sendResponse<IStore>(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Store created successfully!',
    data: result,
  });
});

const getStoreById = catchAsync(async (req: Request, res: Response) => {
  const { storeId } = req.params;

  const result = await StoreServices.getStoreByIdFromDB(storeId);

  sendResponse<IStore>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Store retrieved successfully!',
    data: result,
  });
});

const getAllStores = catchAsync(async (req: Request, res: Response) => {
  //   const { ...StoreData } = req.body;
  const filters = pick(req.query, storeFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await StoreServices.getAllStoresFromDB(
    filters,
    paginationOptions,
  );

  sendResponse<IStore[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Store fetch successfully!',
    meta: result.meta,
    data: result.data,
  });
});

const updateStore = catchAsync(async (req: Request, res: Response) => {
  const storeId = req.params;
  const { ...StoreData } = req.body;

  const result = await StoreServices.updateStoreIntoDB(storeId, StoreData);

  sendResponse<IStore>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Store Updated successfully!',
    data: result,
  });
});

const deleteStore = catchAsync(async (req: Request, res: Response) => {
  const storeId = req.params;

  const result = await StoreServices.deleteStoreFromDB(storeId);

  sendResponse<IStore>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Store Deleted successfully!',
    data: result,
  });
});

export const StoreControllers = {
  createStore,
  getStoreById,
  getAllStores,
  updateStore,
  deleteStore,
};
