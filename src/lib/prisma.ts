import { PrismaClient } from "@/app/generated/prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

//global.prisma上にPrismaっクライアントが存在すれば再利用
const prisma = globalForPrisma.prisma || new PrismaClient({ log: ["query"] });
// 非Production環境ではglobalForPrisma.prismaにオブジェクトを格納
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;
