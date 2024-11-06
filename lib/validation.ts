import { z } from "zod"


export const UserFormValidation = z.object({
    name: z.string()
    .min(2, "Name must be at least 2 characters.")
    .max(50, "Name must be at most 50 charatcters."),
    email: z.string().email("Invalid email address."),
    phone: z.string().refine((phone) => /^\+\d{10,15}$/.test(phone),'Invalid phone number') 
        })
  