import { Schema, model } from "mongoose";
import { storeName, storeStatus } from "./store.constant";
import { IStore, STORE_STATUS, TStoreModel } from "./store.interface";

const storeSchema = new Schema<IStore>(
  {
    name: {
      type: String,
      required: [true, "Please provide store name"],
      trim: true,
      lowercase: true,
      unique: true,
      enum: {
        values: storeName,
        message: `name must be one of the following : ${storeName}`,
      },
    },
    description: {
      type: String,
      required: [false, "Please provide description"],
    },
    status: {
      type: String,
      enum: {
        values: storeStatus,
        message: `Status must one of the following : ${storeStatus}`,
      },
      default: STORE_STATUS.ACTIVE,
    },
    manager: {
      type: Schema.Types.ObjectId,
      ref: "Manager",
      required: [true, "Manager must be present"],
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Store = model<IStore, TStoreModel>("Store", storeSchema);
