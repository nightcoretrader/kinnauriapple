import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Navigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../lib/auth";
import { PasswordInput } from "../components/PasswordInput";

const schema = z.object({ email: z.string().email(), password: z.string().min(8) });
type Form = z.infer<typeof schema>;

export function LoginPage() {
  const { token, login } = useAuth();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<Form>({ resolver: zodResolver(schema) });
  if (token) return <Navigate to="/" replace />;
  return (
    <div className="grid min-h-screen place-items-center bg-cream px-4">
      <form
        onSubmit={handleSubmit(async (values) => {
          try { await login(values.email, values.password); }
          catch (e) { toast.error(e instanceof Error ? e.message : "Login failed"); }
        })}
        className="w-full max-w-md rounded-brand bg-white p-8 shadow-soft"
      >
        <p className="text-xs uppercase tracking-[0.25em] text-accent">GI orchard ops</p>
        <h1 className="mt-2 font-display text-3xl">Welcome back</h1>
        <label className="mt-6 block text-sm font-medium">Email</label>
        <input className="mt-1 w-full rounded-brand bg-cream px-3 py-2" {...register("email")} />
        {errors.email && <p className="text-xs text-primary">{errors.email.message}</p>}
        <label className="mt-4 block text-sm font-medium">Password</label>
        <PasswordInput className="mt-1" {...register("password")} />
        {errors.password && <p className="text-xs text-primary">{errors.password.message}</p>}
        <button disabled={isSubmitting} className="mt-6 w-full rounded-brand bg-primary py-2.5 text-white">
          {isSubmitting ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}
