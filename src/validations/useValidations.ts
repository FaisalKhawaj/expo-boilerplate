import { z } from "zod";

export const useValidations = () => {
  const loginSchema = z.object({
    email: z.string().email("Email is Invalid"),
    password: z.string().nonempty("Password is Required!"),
  });

  const signupSchema = z.object({
    email: z.string().email({ message: "Invalid Email" }),
    password: z.string().nonempty("Password is Required!"),
  });

  const forgotPasswordSchema = z.object({
    email: z.string().email({ message: "Invalid Email" }),
  });

  const resetPasswordSchema = z
    .object({
      new_password: z.string().nonempty("Password is Required!"),
      new_password_confirmation: z.string().nonempty("Password is required!"),
    })
    .refine((data) => data.new_password === data.new_password_confirmation, {
      message: "Passwords don't match",
      path: ["new_password_confirmation"],
    });

  return {
    loginSchema,
    signupSchema,
    forgotPasswordSchema,
    resetPasswordSchema,
  };
};
