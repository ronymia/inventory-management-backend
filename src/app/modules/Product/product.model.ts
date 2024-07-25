import { Schema, model } from "mongoose";
import { IProduct, TProductModel } from "./product.interface";
import { unit } from "./product.constant";

const productSchema = new Schema<IProduct, TProductModel>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
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
        values: unit,
        message: "Unit must be one of the following: kg, litre, pcs, bag",
      },
    },
    image_URLs: {
      type: [String],
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
  },
  {
    timestamps: true,
    toJSON: {
      virtual: true,
    },
  }
);

export const Product = model<IProduct, TProductModel>("Product", productSchema);
