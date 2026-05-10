"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";

const settingsSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
});

type SettingsForm = z.infer<typeof settingsSchema>;

export default function SettingsPage() {
  const form = useForm<SettingsForm>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      firstName: "Emily",
      lastName: "Johnson",
      email: "emily.johnson@x.dummyjson.com",
    },
  });

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-11 md:px-6 md:py-12">
      <div className="rounded-[1.5rem] border border-[rgb(27_18_38_/0.06)] bg-[var(--surface)] p-7 shadow-[var(--shadow-card)] ring-1 ring-[rgb(225_29_116_/0.06)] md:p-9">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--accent-strong)]">Account</p>
        <h1 className="mt-2 text-[2rem] font-semibold tracking-tight text-[var(--brand)]">Settings</h1>
        <p className="mt-2 max-w-xl text-[15px] leading-relaxed text-[var(--muted)]">
          Profile preferences with React Hook Form and validation.
        </p>
        <form className="mt-8 grid gap-4" onSubmit={form.handleSubmit(() => {})}>
          <input className="input-field" placeholder="First name" {...form.register("firstName")} />
          <input className="input-field" placeholder="Last name" {...form.register("lastName")} />
          <input className="input-field" type="email" placeholder="Email" {...form.register("email")} />
          <Button className="mt-2 w-full rounded-2xl py-6 sm:w-auto" type="submit">
            Save changes
          </Button>
        </form>
      </div>
    </main>
  );
}
