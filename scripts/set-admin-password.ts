import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "../src/generated/prisma/client";

const adapter = new PrismaBetterSqlite3({ url: process.env.DATABASE_URL ?? "file:./dev.db" });
const prisma = new PrismaClient({ adapter });

async function main() {
  const [username, newPassword] = process.argv.slice(2);
  if (!username || !newPassword) {
    throw new Error("Usage: npx tsx scripts/set-admin-password.ts <username> <new-password>");
  }

  const passwordHash = await bcrypt.hash(newPassword, 12);
  const { count } = await prisma.adminUser.updateMany({ where: { username }, data: { passwordHash } });
  if (count === 0) {
    throw new Error(`No admin user found with username "${username}"`);
  }
  console.log(`Password updated for "${username}".`);
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
