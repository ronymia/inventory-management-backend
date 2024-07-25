import { Model } from "mongoose";
import { TGender } from "../../interfaces/user";


export type IFullName = {
  first_name: string;
  middle_name?: string;
  last_name: string;
};

export type ISupplier = {
  id: string;
  name: IFullName;
  profile_image: string;
  date_of_birth: string;
  joining_date: string;
  gender: TGender;
  blood_group: TBloodGroup';
};

export type TSupplierModel = Model<ISupplier, {}>;
