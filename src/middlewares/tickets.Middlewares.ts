import { Request, Response, NextFunction } from 'express';
import { TicketRepository } from '../repositories/tickets.Repositories';
import { TicketStatus } from '@prisma/client';
import { UserRepository } from '../repositories/user.Repositories';

const userRepository = new UserRepository();
const ticketRepository = new TicketRepository();

export async function validateTicketCreation(req: Request, res: Response, next: NextFunction) {
  const { titulo, descricao, prioridade } = req.body;
  const { userId } = req.params;

  if (!titulo || !descricao || !prioridade) {
    return res.status(400).json({ message: 'Campos obrigatórios ausentes' });
  }

  if (!userId) {
    return res.status(400).json({ message: 'userId não informado nos params' });
  }

  const user = await userRepository.findById(Number(userId));
  if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });

  (req as any).locals = {
    userId: Number(userId),
    userSetorId: user.sectorId, 
  };

  next();
}

export function validateTicketUpdate(req: Request, res: Response, next: NextFunction) {
  const { status } = req.body;
  const { userId } = req.params;

  if (!status) {
    return res.status(400).json({ message: 'Status é obrigatório' });
  }

  if (!userId) {
    return res.status(400).json({ message: 'userId é obrigatório' });
  }

  (req as any).locals = {
    userId: Number(userId),
  };

  next();
}

export async function checkTicketExists(req: Request, res: Response, next: NextFunction) {
  const ticketId = Number(req.params.ticketId);

  if (isNaN(ticketId)) {
    return res.status(400).json({ message: 'ID do ticket inválido' });
  }

  const ticket = await ticketRepository.findById(ticketId);

  if (!ticket) {
    return res.status(404).json({ message: 'Ticket não encontrado' });
  }

  (req as any).ticket = ticket;
  next();
}

export function preventEditClosedTickets(req: Request, res: Response, next: NextFunction) {
  const ticket = (req as any).ticket;

  if (ticket.status === 'CONCLUIDA' || ticket.status === 'CANCELADA') {
    return res
      .status(400)
      .json({ message: 'Ticket não pode ser editado' });
  }

  next();
}

export async function checkResponsibleSector(
  req: Request,
  res: Response,
  next: NextFunction,
  repo: UserRepository = userRepository
) {
  const ticket = (req as any).ticket;
  const status = req.body.status as TicketStatus;
  const { userId } = (req as any).locals;

  const user = await repo.findById(userId);
  if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });

  const userSectorId = user.sectorId;

  if (
    (status === 'EM_ANDAMENTO' || status === 'CONCLUIDA') &&
    ticket.setorResponsavelId !== userSectorId
  ) {
    return res.status(403).json({
      message: 'Apenas o setor responsável pode alterar para este status',
    });
  }

  next();
}