import mongoose from "mongoose";
import { TErrorSources, TGenericErrorResponse } from "../interfaces/errors";

const handleCastError = (
  err: mongoose.Error.CastError
): TGenericErrorResponse => {
  const statusCode = httpStatus.UNPROCESSABLE_ENTITY;

  const errorSources: TErrorSources = [
    {
      path: err.path,
      message: err.message,
    },
  ];

  return {
    statusCode,
    message: "Invalid ID",
    errorSources,
  };
};

export default handleCastError;
