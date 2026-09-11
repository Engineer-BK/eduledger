import "dotenv/config";

let prisma: any;

try {
  const { PrismaClient } = require("@prisma/client");
  const globalForPrisma = globalThis as unknown as { prisma: any };
  prisma = globalForPrisma.prisma || new PrismaClient();
  if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = prisma;
  }
} catch {
  // Fallback mock store if Prisma client is not generated or database is offline
  prisma = {
    user: {
      findMany: async () => [
        { id: "1", name: "Efua Asante", email: "efua.asante@example.com", createdAt: new Date() },
        { id: "2", name: "Ama Mensah", email: "ama.mensah@school.edu", createdAt: new Date() },
        { id: "3", name: "Kwame Asante", email: "kwame.a@student.school.edu", createdAt: new Date() }
      ],
      findUnique: async () => null,
      create: async (args: any) => ({ id: String(Date.now()), ...args?.data, createdAt: new Date() }),
    },
  };
}

export { prisma };
export default prisma;

