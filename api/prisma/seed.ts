import { PrismaClient, AdminRole } from "@prisma/client";
import * as bcrypt from "bcryptjs";
import { config } from "dotenv";
import { resolve } from "path";

config({ path: resolve(__dirname, "../.env") });

const prisma = new PrismaClient();

async function main() {
  const email = process.env.SEED_ADMIN_EMAIL ?? "leo.a@example.org";
  const password = process.env.SEED_ADMIN_PASSWORD ?? "ChangeMe123!";
  const name = process.env.SEED_ADMIN_NAME ?? "Kinnaur Super Admin";
  const passwordHash = await bcrypt.hash(password, 12);

  await prisma.adminUser.upsert({
    where: { email },
    update: { passwordHash, name, role: AdminRole.SUPER_ADMIN },
    create: { email, passwordHash, name, role: AdminRole.SUPER_ADMIN },
  });

  const defaults = [
    { key: "pricePerKg", value: "350" },
    { key: "notifyEmail", value: "true" },
    { key: "notifyWhatsapp", value: "false" },
    { key: "whatsappNumber", value: "+919876543210" },
    { key: "contactEmail", value: "xena.w@example.org" },
  ];

  for (const setting of defaults) {
    await prisma.appSetting.upsert({
      where: { key: setting.key },
      update: {},
      create: setting,
    });
  }

  console.log(`Seeded super admin: ${email}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
