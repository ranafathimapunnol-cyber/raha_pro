import { api } from "./client";
import type { PropertyResponse } from "@/types/property";

export type PropertyFilters = {
  city?: string;
  rent?: string;
  bedrooms?: string;
  type?: string;
  page?: number;
  per_page?: number;
};

export async function getProperties(filters: PropertyFilters = {}) {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== "") params.set(key, String(value));
  });
  return api<PropertyResponse>(`/api/properties?${params.toString()}`);
}
