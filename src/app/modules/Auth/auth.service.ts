import httpStatus from "http-status";
import { Secret } from "jsonwebtoken";
import AppError from "../../errors/AppError";
import { User } from "../User/user.model";
import {
  TLoginUser,
  TLoginUserResponse,
  TRefreshTokenResponse,
} from "./auth.interface";
import { JwtHelpers } from "../../helpers/jwtHelpers";
import config from "../../config";

const loginUser = async (
  loginData: TLoginUser
): Promise<TLoginUserResponse> => {
  const { id, password } = loginData;
  // VERIFY USER EXISTENCE
  const user = await User.isUserExist(id);
  // IF NOT EXIST
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not Found");
  }

  // CHECKING USER IS ALREADY DELETE
  if (user?.is_deleted) {
    throw new AppError(httpStatus.FORBIDDEN, "User Already Delete");
  }
  // CHECKING IF USER IS BLOCK
  if (user?.status === "block") {
    throw new AppError(httpStatus.FORBIDDEN, "User is block");
  }

  //VERIFY PASSWORD MATCH
  if (!(await User.isPasswordMatch(password, user.password))) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Password do not match");
  }

  //CREATE JWT access_token and refresh_token
  const { user_id, role, is_Password_reset_required } = user;

  // CREATE access_token
  const accessToken = JwtHelpers.createToken(
    { user_id, role },
    config.jwt_access_secret as Secret,
    config.jwt_access_expires_in as string
  );
  // CREATE refresh_token
  const refreshToken = JwtHelpers.createToken(
    { user_id, role },
    config.jwt_refresh_secret as Secret,
    config.jwt_refresh_expires_in as string
  );

  return {
    access_token: accessToken,
    refresh_token: refreshToken,
    is_Password_reset_required,
  };
};

const refreshToken = async (token: string): Promise<TRefreshTokenResponse> => {
  // Invalid token synchronous
  let verifiedToken = null;
  try {
    verifiedToken = JwtHelpers.verifyToken(
      token,
      config.jwt_refresh_secret as Secret
    );
  } catch (error: any) {
    if (error.name === "TokenExpiredError") {
      throw new AppError(httpStatus.UNAUTHORIZED, "JWT token has expired");
    } else if (error.name === "JsonwebTokenError") {
      throw new AppError(httpStatus.FORBIDDEN, "Invalid JWT token");
    } else {
      throw new AppError(httpStatus.FORBIDDEN, "Could not verify JWT token");
    }
  }

  const { user_id } = verifiedToken;
  //
  const user = await User.isUserExist(user_id);
  //
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, " User not found");
  }

  // GENERATE NEW ACCESS TOKEN
  const newAccessToken = JwtHelpers.createToken(
    {
      user_id: user?.user_id,
      role: user?.role,
    },
    config.jwt_refresh_secret as Secret,
    config.jwt_refresh_expires_in as string
  );

  //
  return {
    access_token: newAccessToken,
  };
};

export const AuthServices = {
  loginUser,
  refreshToken,
};
