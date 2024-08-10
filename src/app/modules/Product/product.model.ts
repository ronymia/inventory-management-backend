import { Schema, model } from 'mongoose';
import { IProduct, TProductModel } from './product.interface';
import { unit } from './product.constant';

const productSchema = new Schema<IProduct, TProductModel>(
  {
    name: {
      type: String,
      required: [true, 'Please provide a name of this product'],
      trim: true,
      unique: true,
      minlength: [3, 'Name must be at least 3 characters'],
      maxlength: [100, 'Name is too large'],
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
        message: 'Unit must be one of the following: kg, litre, pcs, bag',
      },
    },
    imageURLs: {
      type: [String],
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    brand: {
      type: Schema.Types.ObjectId,
      ref: 'Brand',
      required: [true, 'Please provide Brand ID'],
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

export const Product = model<IProduct, TProductModel>('Product', productSchema);
