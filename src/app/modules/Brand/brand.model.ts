import { Schema, model } from 'mongoose';
import validator from 'validator';
import { IBrand, STATUS, TBrandModel } from './brand.interface';
import { status } from './brand.constant';

// Define the schema
const brandSchema = new Schema<IBrand, TBrandModel>(
  {
    name: {
      type: String,
      required: [true, 'Please provide brand name'],
      trim: true,
      unique: true,
      maxlength: 100,
    },
    description: {
      type: String,
      required: [false, 'Please provide Description'],
    },
    email: {
      type: String,
      lowercase: true,
      validate: {
        validator: (value: string) => {
          if (value === '' || validator.isEmail(value)) {
            return true;
          }
          return false;
        },
      },
    },
    website: {
      type: String,
      lowercase: true,
      validate: {
        validator: (value: string) => {
          if (value === '' || validator.isURL(value)) {
            return true;
          }
          return false;
        },
      },
    },
    address: {
      type: String,
      required: [false, 'Please provide location'],
    },
    products: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Product',
        },
      ],
    },
    suppliers: {
      name: String,
      contactNumber: String,
      id: {
        type: {
          type: Schema.Types.ObjectId,
          ref: 'Supplier',
        },
      },
    },
    status: {
      type: String,
      required: [true, 'Please provide Brand status'],
      enum: {
        values: status,
        message: `Brand Status must be one of the following : ${STATUS.ACTIVE}, ${STATUS.IN_ACTIVE}`,
      },
      default: STATUS.ACTIVE,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

export const Brand = model<IBrand, TBrandModel>('Brand', brandSchema);
