import { TErrorSources, TGenericErrorResponse } from "../interfaces/errors";

const handleZodError = (errors: ZodError): TGenericErrorResponse => {
  const statusCode = httpStatus.UNPROCESSABLE_ENTITY;

  const errorSources: TErrorSources = errors.issues.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue?.path.length - 1],
      message: issue?.message,
    };
  });

  return {
    statusCode,
    message: "Validation Error",
    errorSources,
  };
};

export default handleZodError;
