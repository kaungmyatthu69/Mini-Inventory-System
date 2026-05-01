import { z } from 'zod'

// Schemas
export const loginSchema = z.object({
  email: z.email('Please enter a valid email'),
  password: z.string().min(1, 'Password is required'),
})

export const registerSchema = z
  .object({
    name: z.string().min(1, 'Name is required'),
    email: z.email('Please enter a valid email'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

// Types
export type LoginPayload = z.infer<typeof loginSchema>
export type RegisterPayload = Omit<z.infer<typeof registerSchema>, 'confirmPassword'>

export interface User {
  id: string
  name: string
  email: string
}

export interface AuthResponse {
  token_type: string
  token: string
  user: User
}
