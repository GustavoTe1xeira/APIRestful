import { z } from 'zod'

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
})

export const signUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  address: z.string().min(3),
  phone: z.string().min(8),
  rg: z.string().min(5),
  birthDate: z.string()
})