import { prisma } from "../lib/client";

export class UserRepository {
    
  async findById(userId: number) {
    return prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        sectorId: true,
      },
    });
  }
}