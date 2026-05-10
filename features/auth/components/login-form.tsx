"use client";

import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/lib/constants";
import { cn } from "@/lib/utils";

const schema = z.object({
  username: z.string().min(2, "Username is required"),
  password: z.string().min(3, "Password is required"),
});

type FormValues = z.infer<typeof schema>;

export function LoginForm() {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { username: "emilys", password: "emilyspass" },
  });

  const onSubmit = (values: FormValues) =>
    startTransition(async () => {
      const result = await signIn("credentials", {
        ...values,
        redirect: false,
      });

      if (!result?.error) {
        router.push(ROUTES.products);
        router.refresh();
      } else {
        form.setError("root", { message: "Invalid credentials" });
      }
    });

  return (
    <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
      <div className="space-y-1">
        <label className="text-sm font-medium" htmlFor="username">
          Username
        </label>
        <input
          id="username"
          className={cn(
            "h-10 w-full rounded-md border border-zinc-300 px-3",
            form.formState.errors.username && "border-red-500",
          )}
          {...form.register("username")}
        />
        {form.formState.errors.username ? (
          <p className="text-xs text-red-600">{form.formState.errors.username.message}</p>
        ) : null}
      </div>
      <div className="space-y-1">
        <label className="text-sm font-medium" htmlFor="password">
          Password
        </label>
        <input
          id="password"
          type="password"
          className={cn(
            "h-10 w-full rounded-md border border-zinc-300 px-3",
            form.formState.errors.password && "border-red-500",
          )}
          {...form.register("password")}
        />
        {form.formState.errors.password ? (
          <p className="text-xs text-red-600">{form.formState.errors.password.message}</p>
        ) : null}
      </div>

      {form.formState.errors.root ? (
        <p className="text-xs text-red-600">{form.formState.errors.root.message}</p>
      ) : null}

      <Button className="w-full" type="submit" disabled={pending}>
        {pending ? "Signing in..." : "Sign in"}
      </Button>
      <div className="grid grid-cols-2 gap-2">
        <Button type="button" variant="secondary" onClick={() => signIn("google")}>
          Google
        </Button>
        <Button type="button" variant="secondary" onClick={() => signIn("facebook")}>
          Facebook
        </Button>
      </div>
    </form>
  );
}
