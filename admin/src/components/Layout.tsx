import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../lib/auth";

const links = [
  { to: "/", label: "Dashboard" },
  { to: "/orders", label: "Orders" },
  { to: "/customers", label: "Customers" },
  { to: "/activity", label: "Activity" },
  { to: "/settings", label: "Settings" },
];

export function Layout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-cream">
      <aside className="fixed inset-y-0 left-0 w-60 border-r border-bark/10 bg-white/70 p-5">
        <p className="font-display text-xl text-primary">Kinnaur</p>
        <p className="mt-1 text-xs uppercase tracking-[0.2em] text-bark-muted">Admin portal</p>
        <nav className="mt-8 flex flex-col gap-1">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              className={({ isActive }) =>
                `rounded-brand px-3 py-2 text-sm ${isActive ? "bg-primary/10 font-medium text-primary" : "text-bark-muted hover:bg-cream-alt"}`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
        <div className="absolute bottom-5 left-5 right-5">
          <p className="truncate text-xs text-bark-muted">{user?.email}</p>
          <button className="mt-2 text-sm text-primary" onClick={() => { logout(); navigate("/login"); }}>
            Logout
          </button>
        </div>
      </aside>
      <main className="ml-60 p-8">
        <Outlet />
      </main>
    </div>
  );
}
