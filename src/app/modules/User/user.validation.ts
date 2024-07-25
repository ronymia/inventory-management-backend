import { z } from "zod";
import { blood_group, gender } from "../../constants/user";

const createAdminZodSchema = {
  body: z.object({
    name: z.object({
      first_name: z.string({ required_error: "Please provide first name" }),
      middle_name: z
        .string({ required_error: "Please provide middle name" })
        .optional(),
      last_name: z.string({ required_error: "Please provide last name" }),
    }),
    email: z.string({ required_error: "Please provide email" }),
    profile_image: z
      .string({ required_error: "Please provide profile image" })
      .optional(),
    date_of_birth: z.string({ required_error: "Please provide date of birth" }),
    joining_date: z.string({ required_error: "Please provide joining date" }),
    gender: z.enum([...gender] as [string, ...string[]], {
      required_error: "Please provide Gender",
    }),
    blood_group: z.enum([...blood_group] as [string, ...string[]], {
      required_error: "Please provide Blood group",
    }),
  }),
};
const createManagerZodSchema = {
  body: z.object({
    name: z.object({
      first_name: z.string({ required_error: "Please provide first name" }),
      middle_name: z
        .string({ required_error: "Please provide middle name" })
        .optional(),
      last_name: z.string({ required_error: "Please provide last name" }),
    }),
    email: z.string({ required_error: "Please provide email" }),
    profile_image: z
      .string({ required_error: "Please provide profile image" })
      .optional(),
    date_of_birth: z.string({ required_error: "Please provide date of birth" }),
    joining_date: z.string({ required_error: "Please provide joining date" }),
    gender: z.enum([...gender] as [string, ...string[]], {
      required_error: "Please provide Gender",
    }),
    blood_group: z.enum([...blood_group] as [string, ...string[]], {
      required_error: "Please provide Blood group",
    }),
  }),
};
const createSupplierZodSchema = {
  body: z.object({
    name: z.object({
      first_name: z.string({ required_error: "Please provide first name" }),
      middle_name: z
        .string({ required_error: "Please provide middle name" })
        .optional(),
      last_name: z.string({ required_error: "Please provide last name" }),
    }),
    email: z.string({ required_error: "Please provide email" }),
    profile_image: z
      .string({ required_error: "Please provide profile image" })
      .optional(),
    date_of_birth: z.string({ required_error: "Please provide date of birth" }),
    joining_date: z.string({ required_error: "Please provide joining date" }),
    gender: z.enum([...gender] as [string, ...string[]], {
      required_error: "Please provide Gender",
    }),
    blood_group: z.enum([...blood_group] as [string, ...string[]], {
      required_error: "Please provide Blood group",
    }),
  }),
};

export const UserZodValidations = {
  createAdminZodSchema,
  createManagerZodSchema,
  createSupplierZodSchema,
};
