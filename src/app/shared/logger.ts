import path from "path";
import { createLogger, format, transports } from "winston";
import "winston-daily-rotate-file";
const { combine, timestamp, label, printf } = format;

const loggerFormat = printf(({ level, message, label, timestamp }) => {
  const date = new Date(timestamp);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  return `${date.toDateString()} ${hours}:${minutes}:${seconds} } [${label}] ${level}: ${message}`;
});

const logger = createLogger({
  level: "info",
  format: combine(
    label({ label: "Inventory Management" }),
    timestamp(),
    loggerFormat
  ),
  transports: [
    new transports.Console(),
    new transports.DailyRotateFile({
      level: "info",
      filename: path.join(
        process.cwd(),
        "logs",
        "successes",
        "%DATE%success.log"
      ),
      datePattern: "YYYY-MM-DD-HH",
      zippedArchive: true,
      maxSize: "20m",
      maxFiles: "1d",
    }),
  ],
});
const errorLogger = createLogger({
  level: "error",
  format: combine(label({ label: "PH" }), timestamp(), loggerFormat),
  transports: [
    new transports.Console(),
    new transports.DailyRotateFile({
      level: "error",
      filename: path.join(process.cwd(), "logs", "errors", "%DATE%error.log"),
      datePattern: "YYYY-MM-DD-HH",
      zippedArchive: true,
      maxSize: "20m",
      maxFiles: "1d",
    }),
  ],
});

export { logger, errorLogger };
