import { z } from "zod";


export const AddressSchema = z.object({
    address_line_1: z.string().min(5, "Address line 1 is required"),
    address_line_2: z.string().optional(),
    city: z.string().min(3, "City is required"),
    state: z.string().min(2, "State is required"),
    zip: z.string().min(5, "Zip code is required"),
    country: z.string().min(3, "Country is required"),

})

export const phoneSchema = z.object({
    primary: z.string().min(10, "Please enter a valid Primary number"),
    secondary: z.string().min(10, "Please enter a valid Secondary number"),
})

export const stepFormSchema = z.object({
  name: z.string().min(3, "Name is required"),
  email: z.string().email("Please enter a valid email address"),
  phone: phoneSchema,
  address: z.array(AddressSchema),
  terms: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions",
  }),
});

export type stepFormSchema = z.infer<typeof stepFormSchema>;