import config from "../config";
import AppError from "../errors/AppError";
import handleCastError from "../errors/handleCastError";
import handleDuplicateError from "../errors/handleDuplicateError";
import handleValidationError from "../errors/handleValidationError";
import handleZodError from "../errors/handleZodError";
import { TErrorSources } from "../interfaces/errors";
import { errorLogger } from "../shared/logger";

const globalErrorHandler: ErrorRequestHandler = (errors, req, res, next) => {
  //Debug
  config.env === "development"
    ? console.log(`🐱‍🏍 globalErrorHandler ~~`, errors)
    : errorLogger.error(`🐱‍🏍 globalErrorHandler ~~`, errors);

  //SETTING DEFAULT VALUES
  let statusCode = 500;
  let message = "Something went wrong!";
  let errorSources: TErrorSources = [
    {
      path: "",
      message: "Something went wrong",
    },
  ];

  /*
    ?CHECKING ERRORS TYPE
   * Zod validation error
   * mongoose validation error
   * Duplicate Entity Error
   * mongoose cast error => invalid ObjectId
   * Custom throw error
   */

  //  ZOD ERRORS
  if (errors instanceof ZodError) {
    const simplifiedError = handleZodError(errors);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSources = simplifiedError.errorSources;
  } else if (errors?.name === "ValidationError") {
    const simplifiedError = handleValidationError(errors);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  } else if (errors?.name === "CastError") {
    const simplifiedError = handleCastError(errors);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  } else if (errors?.code === 11000) {
    const simplifiedError = handleDuplicateError(errors);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  } else if (errors instanceof AppError) {
    statusCode = errors?.statusCode;
    message = errors.message;
    errorSources = [
      {
        path: "",
        message: errors?.message,
      },
    ];
  } else if (errors instanceof Error) {
    message = errors.message;
    errorSources = [
      {
        path: "",
        message: errors?.message,
      },
    ];
  }

  //ultimate return
  return res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    errors,
    stack: config.NODE_ENV === "development" ? errors?.stack : null,
  });
};

export default globalErrorHandler;
