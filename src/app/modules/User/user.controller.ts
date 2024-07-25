import { Request, RequestHandler, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { IUser } from "./user.interface";
import { UserServices } from "./user.service";

const createAdmin: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { admin, ...userData } = req.body;

    const result = await UserServices.createAdminIntoDB(userData, admin);

    sendResponse<IUser>(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "Admin created successfully!",
      data: result,
    });
  }
);
const createManager: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { manager, ...userData } = req.body;

    const result = await UserServices.createManagerIntoDB(userData, manager);

    sendResponse<IUser>(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "Manager created successfully!",
      data: result,
    });
  }
);
const createSupplier: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { supplier, ...userData } = req.body;

    const result = await UserServices.createSupplierIntoDB(userData, supplier);

    sendResponse<IUser>(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "Manager created successfully!",
      data: result,
    });
  }
);

export const UserControllers = {
  createAdmin,
  createManager,
  createSupplier,
};
