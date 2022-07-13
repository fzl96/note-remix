import { ZodSchema } from "zod"

export interface SignupForm {
  email: string
  password: string
  name: string
}

export interface LoginForm {
  email: string,
  password: string
}

export interface ValidationProps {
  request: Request,
  schema: ZodSchema
}