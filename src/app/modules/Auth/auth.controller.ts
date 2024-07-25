import { RequestHandler, Request, Response } from "express";
import httpStatus from "http-status";
import config from "../../config";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { TLoginUserResponse } from "./auth.interface";
import { AuthServices } from "./auth.service";

const loginUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { ...loginData } = req.body;

    const { refresh_token, ...result } = await AuthServices.loginUser(
      loginData
    );

    // SET REFRESH TOKEN TO COOKIE
    const cookieOptions = {
      secure: config.NODE_ENV === "production",
      httpOnly: true,
    };
    res.cookie("refresh_token", refresh_token, cookieOptions);

    //
    sendResponse<TLoginUserResponse>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "user login successfully",
      data: result,
    });
  }
);

const refreshToken: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const refresh_token = req.cookie;

    const result = await AuthServices.refreshToken(refresh_token);

    // SET REFRESH TOKEN TO COOKIE
    const cookieOptions = {
      secure: config.NODE_ENV === "product",
      httpOnly: true,
    };
    res.cookie("refresh_token", result, cookieOptions);

    //
    sendResponse<TLoginUserResponse>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "user login successfully",
      data: result,
    });
  }
);

export const AuthControllers = {
  loginUser,
  refreshToken,
};
