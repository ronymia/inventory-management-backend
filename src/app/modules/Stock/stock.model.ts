import { Schema, model } from "mongoose";
import { stockStatus, stockUnit } from "./stock.constant";
import { IStock, TStockModel } from "./stock.interface";

const stockSchema = new Schema<IStock, TStockModel>(
  {
    productId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Product",
    },
    name: {
      type: String,
      required: true,
      trim: true,
      unique: [true, "Name must be unique"],
      lowercase: true,
      minlength: [3, "Name must be at least 3 characters"],
      maxlength: [20, "Name is too large"],
    },
    description: {
      type: String,
      required: true,
    },
    unit: {
      type: String,
      required: true,
      enum: {
        values: stockUnit,
        message: `Unit must be one of the following: ${stockUnit}`,
      },
    },
    image_URLs: {
      validator: (value) => {
        if (!Array.isArray(value)) {
          return false;
        }
        let isValid = true;
        value.forEach((url) => {
          if (!validator.isURL(url)) {
            isValid = false;
          }
        });
        return isValid;
      },
    },
    price: {
      type: Number,
      required: true,
      min: [0, "Product price cannot be negative"],
    },
    quantity: {
      type: Number,
      required: true,
      min: [0, "Product quantity cannot be negative"],
    },
    status: {
      type: String,
      enum: stockStatus,
      message: `status can't be {VALUE}, status must be one of the following : 
      ${stockStatus.join(",")}`,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    brand: {
      type: Schema.Types.ObjectId,
      ref: "Brand",
      required: true,
    },

    store: {
      type: Schema.Types.ObjectId,
      required: [true, "Please provide store id"],
      ref: "Store",
    },
    suppliedBy: {
      type: Schema.Types.ObjectId,
      required: [true, "Please provide supplier id"],
      ref: "Supplier",
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Stock = model<IStock, TStockModel>("Stock", stockSchema);
