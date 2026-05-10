"use client";

import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { axiosClient } from "@/core/infrastructure/http/axios-client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const schema = z
  .object({
    firstName: z.string().min(2, "First name is required"),
    lastName: z.string().min(2, "Last name is required"),
    email: z.string().email("Enter a valid email"),
    username: z.string().min(3, "Username is required"),
    password: z.string().min(6, "Min 6 characters"),
    confirmPassword: z.string().min(6, "Confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

type FormValues = z.infer<typeof schema>;

export function RegisterForm() {
  const [message, setMessage] = useState<string>("");
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (values: FormValues) => {
    const { confirmPassword, ...payload } = values;
    void confirmPassword;
    await axiosClient.post("/users/add", payload);
    setMessage("Account created (mock API). You can now log in.");
    form.reset();
  };

  return (
    <form className="mt-6 grid gap-3" onSubmit={form.handleSubmit(onSubmit)}>
      <div className="grid gap-3 sm:grid-cols-2">
        <input
          className={cn(
            "h-10 rounded-md border border-zinc-300 px-3",
            form.formState.errors.firstName && "border-red-500",
          )}
          placeholder="First name"
          {...form.register("firstName")}
        />
        <input
          className={cn(
            "h-10 rounded-md border border-zinc-300 px-3",
            form.formState.errors.lastName && "border-red-500",
          )}
          placeholder="Last name"
          {...form.register("lastName")}
        />
      </div>
      <input
        className={cn(
          "h-10 rounded-md border border-zinc-300 px-3",
          form.formState.errors.email && "border-red-500",
        )}
        placeholder="Email"
        {...form.register("email")}
      />
      <input
        className={cn(
          "h-10 rounded-md border border-zinc-300 px-3",
          form.formState.errors.username && "border-red-500",
        )}
        placeholder="Username"
        {...form.register("username")}
      />
      <input
        className={cn(
          "h-10 rounded-md border border-zinc-300 px-3",
          form.formState.errors.password && "border-red-500",
        )}
        placeholder="Password"
        type="password"
        {...form.register("password")}
      />
      <input
        className={cn(
          "h-10 rounded-md border border-zinc-300 px-3",
          form.formState.errors.confirmPassword && "border-red-500",
        )}
        placeholder="Confirm password"
        type="password"
        {...form.register("confirmPassword")}
      />
      <Button type="submit">Create account</Button>
      <div className="grid grid-cols-2 gap-2">
        <Button type="button" variant="secondary" onClick={() => signIn("google")}>
          Google
        </Button>
        <Button type="button" variant="secondary" onClick={() => signIn("facebook")}>
          Facebook
        </Button>
      </div>
      {message ? <p className="text-sm text-green-700">{message}</p> : null}
      <p className="text-sm text-zinc-600">
        Already have an account?{" "}
        <Link href="/login" className="font-medium text-black">
          Sign in
        </Link>
      </p>
    </form>
  );
}
