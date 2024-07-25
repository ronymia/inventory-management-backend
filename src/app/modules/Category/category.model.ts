import { model, Schema } from "mongoose";
import { ICategory, TCategoryModel } from "./category.interface";

const categorySchema = new Schema<ICategory, TCategoryModel>(
  {
    name: {
      type: String,
      required: [true, "Please provide a category name"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    description: {
      type: String,
      required: [false, "Please provide category description"],
    },
    image_URL: {
      type: String,
      validator: [validator.isURL, "Please provide a valid URL"],
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Category = model<ICategory, TCategoryModel>(
  "Category",
  categorySchema
);
