import type { CvData } from "./datedin-data";
import { SITE_URL } from "./site";

const MAX_NAME_LENGTH = 40;
const MAX_STATUS_LENGTH = 120;
const MAX_SKILLS = 4;
const MAX_FLAGS = 30;
const MAX_FLAG_LENGTH = 120;

function utf8ToBase64Url(input: string): string {
  const bytes = new TextEncoder().encode(input);
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function base64UrlToUtf8(input: string): string {
  const padded = input.replace(/-/g, "+").replace(/_/g, "/");
  const withPadding = padded.padEnd(padded.length + ((4 - (padded.length % 4)) % 4), "=");
  const binary = atob(withPadding);
  const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

function isValidCvData(value: unknown): value is CvData {
  if (!value || typeof value !== "object") return false;
  const v = value as Record<string, unknown>;

  const isFlagList = (arr: unknown): arr is string[] =>
    Array.isArray(arr) &&
    arr.length <= MAX_FLAGS &&
    arr.every((f) => typeof f === "string" && f.length <= MAX_FLAG_LENGTH);

  return (
    typeof v["name"] === "string" &&
    v["name"].length > 0 &&
    v["name"].length <= MAX_NAME_LENGTH &&
    typeof v["status"] === "string" &&
    v["status"].length <= MAX_STATUS_LENGTH &&
    Array.isArray(v["skills"]) &&
    v["skills"].length <= MAX_SKILLS &&
    v["skills"].every(
      (s: unknown) =>
        s &&
        typeof s === "object" &&
        typeof (s as { name: unknown }).name === "string" &&
        typeof (s as { value: unknown }).value === "number",
    ) &&
    isFlagList(v["redFlags"]) &&
    typeof v["score"] === "number" &&
    Number.isFinite(v["score"])
  );
}

export function encodeCvData(data: CvData): string {
  return utf8ToBase64Url(JSON.stringify(data));
}

export function decodeCvData(encoded: string): CvData | null {
  try {
    const parsed: unknown = JSON.parse(base64UrlToUtf8(encoded));
    return isValidCvData(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

export function buildSharePath(data: CvData): string {
  return `/cv/${encodeCvData(data)}`;
}

export function buildShareUrl(data: CvData): string {
  return `${SITE_URL}${buildSharePath(data)}`;
}
