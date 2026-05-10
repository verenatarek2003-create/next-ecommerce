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
    <main className="mx-auto w-full max-w-3xl px-4 py-8">
      <h1 className="text-3xl font-semibold">Account settings</h1>
      <p className="mt-2 text-sm text-zinc-600">
        Profile edit UI architecture with React Hook Form + Zod.
      </p>
      <form className="mt-6 grid gap-3" onSubmit={form.handleSubmit(() => {})}>
        <input className="h-10 rounded-md border border-zinc-300 px-3" {...form.register("firstName")} />
        <input className="h-10 rounded-md border border-zinc-300 px-3" {...form.register("lastName")} />
        <input className="h-10 rounded-md border border-zinc-300 px-3" {...form.register("email")} />
        <Button type="submit">Save changes</Button>
      </form>
    </main>
  );
}
