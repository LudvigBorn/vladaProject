// Edge-runtime-safe session verification (no Prisma/bcrypt), used by middleware.
import { jwtVerify } from "jose";

export const SESSION_COOKIE = "admin_session";

function getSecretKey(): Uint8Array {
  const secret = process.env.SESSION_SECRET;
  if (!secret || secret.length < 16) {
    throw new Error("SESSION_SECRET env var must be set to a random string of at least 16 characters");
  }
  return new TextEncoder().encode(secret);
}

export async function isValidSessionToken(token: string | undefined): Promise<boolean> {
  if (!token) return false;
  try {
    await jwtVerify(token, getSecretKey());
    return true;
  } catch {
    return false;
  }
}
