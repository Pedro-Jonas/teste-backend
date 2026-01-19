import { Prisma, TicketHistory } from '@prisma/client';
import { prisma } from '../lib/client';

export class TicketHistoryRepository {
  async create(data: Prisma.TicketHistoryCreateInput): Promise<TicketHistory> {
    return prisma.ticketHistory.create({ data });
  }

  async findAll(): Promise<TicketHistory[]> {
    return prisma.ticketHistory.findMany();
  }

  async findByTicket(ticketId: number | string): Promise<TicketHistory[]> {
    return prisma.ticketHistory.findMany({
      where: { ticketId: Number(ticketId) },
      orderBy: { dataAlteracao: 'asc' },
    });
  }
}
