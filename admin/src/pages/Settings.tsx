import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import type { AdminUser, AppSettings } from "../lib/types";
import { api } from "../lib/api";
import { useAuth } from "../lib/auth";
import { PasswordInput } from "../components/PasswordInput";

const settingsSchema = z.object({
  pricePerKg: z.coerce.number().min(1),
  notifyEmail: z.boolean(),
  notifyWhatsapp: z.boolean(),
  whatsappNumber: z.string(),
  contactEmail: z.string().email(),
});
const userSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
  role: z.enum(["SUPER_ADMIN", "STAFF"]),
});

export function SettingsPage() {
  const { user } = useAuth();
  const qc = useQueryClient();
  const isSuper = user?.role === "SUPER_ADMIN";
  const settings = useQuery({ queryKey: ["settings"], queryFn: () => api<AppSettings>("/api/settings") });
  const users = useQuery({ queryKey: ["users"], queryFn: () => api<AdminUser[]>("/api/users"), enabled: isSuper });
  const settingsForm = useForm<z.infer<typeof settingsSchema>>({ resolver: zodResolver(settingsSchema), values: settings.data });
  const userForm = useForm<z.infer<typeof userSchema>>({ resolver: zodResolver(userSchema), defaultValues: { role: "STAFF" } });
  const saveSettings = useMutation({
    mutationFn: (values: z.infer<typeof settingsSchema>) => api("/api/settings", { method: "PUT", body: JSON.stringify(values) }),
    onSuccess: () => toast.success("Settings saved"),
    onError: (e: Error) => toast.error(e.message),
  });
  const addUser = useMutation({
    mutationFn: (values: z.infer<typeof userSchema>) => api("/api/users", { method: "POST", body: JSON.stringify(values) }),
    onSuccess: () => { toast.success("Admin invited"); qc.invalidateQueries({ queryKey: ["users"] }); userForm.reset({ role: "STAFF", name: "", email: "", password: "" }); },
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <div className="max-w-3xl space-y-8">
      <h1 className="font-display text-3xl">Settings</h1>
      <form className="rounded-brand bg-white p-6 shadow-soft" onSubmit={settingsForm.handleSubmit((v) => saveSettings.mutate(v))}>
        <h2 className="font-display text-xl">Pricing & notifications</h2>
        <label className="mt-4 block text-sm">Base price / kg (₹)</label>
        <input className="mt-1 w-full rounded-brand bg-cream px-3 py-2" {...settingsForm.register("pricePerKg")} />
        <label className="mt-4 block text-sm">Contact email</label>
        <input className="mt-1 w-full rounded-brand bg-cream px-3 py-2" {...settingsForm.register("contactEmail")} />
        <label className="mt-4 block text-sm">WhatsApp number</label>
        <input className="mt-1 w-full rounded-brand bg-cream px-3 py-2" {...settingsForm.register("whatsappNumber")} />
        <label className="mt-4 flex items-center gap-2 text-sm"><input type="checkbox" {...settingsForm.register("notifyEmail")} /> Email alert (stub)</label>
        <label className="mt-2 flex items-center gap-2 text-sm"><input type="checkbox" {...settingsForm.register("notifyWhatsapp")} /> WhatsApp alert (stub)</label>
        <button disabled={!isSuper} className="mt-5 rounded-brand bg-primary px-4 py-2 text-white disabled:opacity-50">Save settings</button>
      </form>
      {isSuper && (
        <div className="rounded-brand bg-white p-6 shadow-soft">
          <h2 className="font-display text-xl">Admin users</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {(users.data ?? []).map((u) => (
              <li key={u.id} className="flex justify-between border-b border-bark/5 py-2"><span>{u.name} · {u.email}</span><span className="text-bark-muted">{u.role}</span></li>
            ))}
          </ul>
          <form className="mt-6 grid gap-3 sm:grid-cols-2" onSubmit={userForm.handleSubmit((v) => addUser.mutate(v))}>
            <input placeholder="Name" className="rounded-brand bg-cream px-3 py-2" {...userForm.register("name")} />
            <input placeholder="Email" className="rounded-brand bg-cream px-3 py-2" {...userForm.register("email")} />
            <PasswordInput placeholder="Password" {...userForm.register("password")} />
            <select className="rounded-brand bg-cream px-3 py-2" {...userForm.register("role")}>
              <option value="STAFF">Staff</option>
              <option value="SUPER_ADMIN">Super Admin</option>
            </select>
            <button className="rounded-brand bg-secondary px-4 py-2 text-white sm:col-span-2">Add admin</button>
          </form>
        </div>
      )}
    </div>
  );
}
