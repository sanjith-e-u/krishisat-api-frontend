export const CREDIT_TO_USD = 0.005;

export type ApiName =
  | "NDVI"
  | "NDMI"
  | "NDWI"
  | "WEATHER"
  | "LST"
  | "NDRE"
  | "SAVI"
  | "EVI"
  | "CI"
  | "Farm Registration";

export const API_PRICING: Record<ApiName, number> = {
  NDVI: 1,
  NDMI: 2,
  NDWI: 2,
  WEATHER: 1,
  LST: 3,
  NDRE: 2,
  SAVI: 2,
  EVI: 2,
  CI: 3,
  "Farm Registration": 0,
};

export function creditsToUsd(credits: number): number {
  const value = credits * CREDIT_TO_USD;
  return Math.round(value * 1000) / 1000;
}

export function formatUsd(value: number): string {
  return `$${value.toFixed(3)}`;
}

export function getApiCredits(api: string): number {
  const name = api.toUpperCase();
  if (name.includes("NDVI")) return 1;
  if (name.includes("NDMI")) return 2;
  if (name.includes("NDWI")) return 2;
  if (name.includes("WEATHER")) return 1;
  if (name.includes("LST")) return 3;
  if (name.includes("NDRE")) return 2;
  if (name.includes("SAVI")) return 2;
  if (name.includes("EVI")) return 2;
  if (name.includes("CI")) return 3;
  if (name.includes("REGISTRATION") || name === "FARMS") return 0;
  if (name.includes("SEGMENTATION")) return 5;
  if (name.includes("IRRIGATION")) return 3;
  if (name.includes("FROST")) return 2;
  if (name.includes("DROUGHT")) return 3;
  if (name.includes("CANOPY")) return 3;
  if (name.includes("DEFORESTATION")) return 4;
  return 1;
}
