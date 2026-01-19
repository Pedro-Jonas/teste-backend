import { Prisma } from '@prisma/client';
import { prisma } from '../lib/client';
import type { Ticket } from '@prisma/client';


export class TicketRepository {

  async create(data: Prisma.TicketCreateInput) : Promise<Ticket> {
    return prisma.ticket.create({ data })
  }

  async findAll() : Promise<Ticket[]> {
    return prisma.ticket.findMany();
  }

 async findById(id: string | number) {
  return prisma.ticket.findUnique({
    where: { id: Number(id) },
  });   
  }

  async update(id: number | string, data: Prisma.TicketUpdateInput): Promise<Ticket> {
    return prisma.ticket.update({
      where: { id: Number(id) }, data 
    });
  }
}