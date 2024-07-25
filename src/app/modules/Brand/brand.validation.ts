import { z } from 'zod';
import { Types } from 'mongoose'; // Assuming you are using Mongoose
import { status } from './brand.constant';

// Define the Zod schema for IProduct
const productSchema = z.object({
  id: z.instanceof(Types.ObjectId),
  // Add other fields of IProduct as needed
});

// Define the Zod schema for ISupplier
const supplierSchema = z.object({
  name: z.string({
    required_error: 'Supplier name is required',
  }),
  phoneNumber: z.number({
    required_error: 'Supplier phone number is required',
  }),
  id: z.array(z.instanceof(Types.ObjectId)), // Assuming this is an array of ObjectIds
});

const createBrandZodSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Brand name is required',
    }),
    description: z.string({
      required_error: 'Brand description is required',
    }),
    email: z.string({
      required_error: 'Brand email is required',
    }),
    address: z.string({
      required_error: 'Brand location is required',
    }),
    products: z.array(productSchema),
    suppliers: z.array(supplierSchema),
    status: z.enum([...status] as [string, ...string[]], {
      required_error: 'Status is required',
    }),
  }),
});

// const updateBrandZodSchema = z.object({
//   body: z.object({
//     name: z
//       .string({
//         required_error: 'Brand name is required',
//       })
//       .optional(),
//     description: z
//       .string({
//         required_error: 'Brand description is required',
//       })
//       .optional(),
//     email: z
//       .string({
//         required_error: 'Brand email is required',
//       })
//       .optional(),
//     location: z
//       .string({
//         required_error: 'Brand location is required',
//       })
//       .optional(),
//     products: z
//       .array({
//         required_error: 'Product is required',
//       })
//       .optional(),
//     suppliers: z
//       .array({
//         required_error: 'Supplier is required',
//       })
//       .optional(),
//     status: z
//       .array([...status] as [string, ...string[]], {
//         required_error: 'Status is required',
//       })
//       .optional(),
//   }),
// });

export const BrandZodValidation = {
  createBrandZodSchema,
  // updateBrandZodSchema,
};
