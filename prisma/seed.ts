import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "../src/generated/prisma/client";
import { defaultContent } from "../src/lib/default-content";

const adapter = new PrismaBetterSqlite3({ url: process.env.DATABASE_URL ?? "file:./dev.db" });
const prisma = new PrismaClient({ adapter });

async function main() {
  const username = process.env.ADMIN_USERNAME;
  const password = process.env.ADMIN_PASSWORD;

  if (!username || !password) {
    throw new Error("ADMIN_USERNAME and ADMIN_PASSWORD must be set (see .env.example)");
  }

  const existingAdminCount = await prisma.adminUser.count();
  if (existingAdminCount === 0) {
    const passwordHash = await bcrypt.hash(password, 12);
    await prisma.adminUser.create({ data: { username, passwordHash } });
    console.log(`Created admin user "${username}"`);
  } else {
    console.log("Admin user already exists, skipping.");
  }

  const existingContent = await prisma.pageContent.findUnique({ where: { id: 1 } });
  if (!existingContent) {
    await prisma.pageContent.create({ data: { id: 1, data: JSON.stringify(defaultContent) } });
    console.log("Seeded default page content.");
  } else {
    console.log("Page content already exists, skipping.");
  }
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
