import { z } from 'zod';
import { unit } from './product.constant';

const createProductZodSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'Product Name must be string',
      required_error: 'Product Name is required',
    }),
    description: z.string({
      invalid_type_error: 'Description must be string',
      required_error: 'Description is required',
    }),
    unit: z.enum([...unit] as [string, ...string[]]),
    imageURLs: z.array(
      z
        .string({
          invalid_type_error: 'Image url must be string',
          required_error: 'Image url is required',
        })
        .optional(),
    ),
    category: z.string({
      invalid_type_error: 'Category ID must be string',
      required_error: 'Category ID is required',
    }),
    brand: z.string({
      invalid_type_error: 'Brand ID must be string',
      required_error: 'Brand ID is required',
    }),
  }),
});
const updateProductZodSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'Product Name must be string',
      required_error: 'Product Name is required',
    }),
    description: z.string({
      invalid_type_error: 'Product description must be string',
      required_error: 'Product Description is required',
    }),
    unit: z.enum([...unit] as [string, ...string[]]),
    image_URLs: z
      .string({
        invalid_type_error: 'Product Image url must be string',
        required_error: 'Product Image url is required',
      })
      .optional(),
    category: z.string({
      invalid_type_error: 'Category ID must be string',
      required_error: 'Category ID is required',
    }),
    brand: z.string({
      invalid_type_error: 'Brand ID must be string',
      required_error: 'Brand ID is required',
    }),
  }),
});

export const ProductValidations = {
  createProductZodSchema,
  updateProductZodSchema,
};
