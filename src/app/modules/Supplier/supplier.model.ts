import { Schema, model } from "mongoose";
import { blood_group, gender } from "../../constants/user";
import { ISupplier, TSupplierModel } from "./supplier.interface";

const supplierSchema = new Schema<ISupplier, TSupplierModel>({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: {
      first_name: {
        type: String,
        required: true,
      },
      middle_name: {
        type: String,
        required: false,
      },
      last_name: {
        type: String,
        required: true,
      },
    },
    required: true,
  },
  profile_image: {
    type: String,
    required: [false, "Please provide Profile Image"],
  },
  date_of_birth: {
    type: String,
    required: [true, "Please provide date of birth"],
  },
  joining_date: {
    type: String,
    required: [true, "Please provide joining date"],
  },
  gender: {
    type: String,
    enum: gender,
    required: [true, "Please provide joining date"],
  },
  blood_group: {
    type: String,
    enum: blood_group,
    required: [true, "Please provide joining date"],
  },
});

export const Supplier = model<ISupplier, TSupplierModel>(
  "Supplier",
  supplierSchema
);
