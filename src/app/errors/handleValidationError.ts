import mongoose from "mongoose";
import { TErrorSources, TGenericErrorResponse } from "../interfaces/errors";

const handleValidationError = (
  err: mongoose.Error.ValidationError
): TGenericErrorResponse => {
  const statusCode = httpStatus.UNPROCESSABLE_ENTITY;

  const errorSources: TErrorSources = Object.values(err.errors).map(
    (element: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: element?.path,
        message: element?.message,
      };
    }
  );

  return {
    statusCode,
    message: "Validation Error",
    errorSources,
  };
};

export default handleValidationError;
