export type PackSize = "FIVE_KG" | "TEN_KG" | "FIFTEEN_KG" | "CUSTOM";
export type BookingStatus = "NEW" | "CONTACTED" | "CONFIRMED" | "FULFILLED" | "CANCELLED";
export type AdminRole = "SUPER_ADMIN" | "STAFF";

export const PACK_SIZE_LABEL: Record<PackSize, string> = {
  FIVE_KG: "5kg",
  TEN_KG: "10kg",
  FIFTEEN_KG: "15kg",
  CUSTOM: "Custom",
};
export const BOOKING_STATUSES: BookingStatus[] = ["NEW", "CONTACTED", "CONFIRMED", "FULFILLED", "CANCELLED"];
export const STATUS_LABEL: Record<BookingStatus, string> = {
  NEW: "New",
  CONTACTED: "Contacted",
  CONFIRMED: "Confirmed",
  FULFILLED: "Fulfilled",
  CANCELLED: "Cancelled",
};

export interface Booking {
  id: string;
  fullName: string;
  phone: string;
  email: string | null;
  pincode: string;
  city: string | null;
  quantityKg: number;
  packSize: PackSize;
  notes: string | null;
  status: BookingStatus;
  source: string | null;
  internalNote: string | null;
  createdAt: string;
  updatedAt: string;
}
export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: AdminRole;
  createdAt: string;
}
export interface ActivityLog {
  id: string;
  bookingId: string | null;
  action: string;
  actorEmail: string;
  createdAt: string;
}
export interface Paginated<T> {
  items: T[];
  meta: { total: number; page: number; pageSize: number; pageCount: number };
}
export interface DashboardSummary {
  totalBookings: number;
  bookingsThisWeek: number;
  totalQuantityKg: number;
  newLeads24h: number;
  conversionRate: number;
}
export interface TimeseriesPoint {
  date: string;
  count: number;
  quantityKg: number;
}
export interface PackSizeBreakdown {
  packSize: PackSize;
  count: number;
  quantityKg: number;
}
export interface Customer {
  phone: string;
  fullName: string;
  email: string | null;
  city: string | null;
  pincode: string;
  bookingCount: number;
  lifetimeQuantityKg: number;
  lastBookingAt: string;
}
export interface AppSettings {
  pricePerKg: number;
  notifyEmail: boolean;
  notifyWhatsapp: boolean;
  whatsappNumber: string;
  contactEmail: string;
}
