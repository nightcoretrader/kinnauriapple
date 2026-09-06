const TOKEN_KEY = "kinnaur_admin_token";
export function getToken() { return localStorage.getItem(TOKEN_KEY); }
export function setToken(token: string) { localStorage.setItem(TOKEN_KEY, token); }
export function clearToken() { localStorage.removeItem(TOKEN_KEY); }
export const API_BASE = import.meta.env.VITE_API_URL ?? "";

export async function api<T>(path: string, init: RequestInit = {}): Promise<T> {
  const token = getToken();
  const headers = new Headers(init.headers);
  if (!(init.body instanceof FormData) && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }
  if (token) headers.set("Authorization", `Bearer ${token}`);
  const res = await fetch(`${API_BASE}${path}`, { ...init, headers });
  const contentType = res.headers.get("content-type") ?? "";
  if (contentType.includes("text/csv")) {
    if (!res.ok) throw new Error("Export failed");
    return (await res.text()) as T;
  }
  const json = await res.json();
  if (!res.ok || json.success === false) throw new Error(json.message ?? "Request failed");
  return json.data as T;
}
