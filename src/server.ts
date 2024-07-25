import mongoose from "mongoose";
import app from "./app";
import config from "./app/config";

let server: Server;

async function main() {
  await mongoose.connect(config.database_url as string);
  console.info(`🛢   Database is connected successfully`);
  server = app.listen(config.port, () => {
    console.info(`Application  listening on port ${config.port}`);
  });

  process.on("unhandledRejection", (error) => {
    if (server) {
      server.close(() => {
        errorLogger.error(error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });

  process.on("uncaughtException", () => {
    console.log(`😈 uncaughtException is detected , shutting down ...`);
    process.exit(1);
  });
}
main();
process.on("SIGTERM", () => {
  logger.info("SIGTERM is received");
  if (server) {
    server.close();
  }
});
