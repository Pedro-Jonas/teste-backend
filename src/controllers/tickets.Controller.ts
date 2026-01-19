import { Request, Response } from "express";
import { Prisma, TicketStatus } from "@prisma/client";
import { TicketRepository } from "../repositories/tickets.Repositories";
import { TicketHistoryRepository } from "../repositories/ticketHistory.Repositories";

const ticketRepository = new TicketRepository();
const ticketHistoryRepository = new TicketHistoryRepository();

export async function postTicket(req: Request, res: Response) {
  try {
    const { userId, userSetorId } = (req as any).locals;
    const { titulo, descricao, prioridade, setorResponsavelId } = req.body;

    const ticket = await ticketRepository.create({
      titulo,
      descricao,
      prioridade,
      status: "ABERTA",
      setorSolicitante: { connect: { id: userSetorId } },
      setorResponsavel: { connect: { id: setorResponsavelId } },
    } as Prisma.TicketCreateInput);

    await ticketHistoryRepository.create({
      ticket: { connect: { id: ticket.id } },
      user: { connect: { id: userId } },
      statusNovo: "ABERTA",
      statusAnterior: null,
    } as Prisma.TicketHistoryCreateInput);

    res.status(201).json(ticket);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao criar ticket", error });
  }
}

export async function getTickets(req: Request, res: Response) {
  try {
    const tickets = await ticketRepository.findAll();
    res.status(200).json(tickets);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao buscar tickets", error });
  }
}

export async function updateTicketStatus(req: Request, res: Response) {
  try {
    const ticket = (req as any).ticket;
    const { userId } = (req as any).locals;
    const { status } = req.body as { status: TicketStatus };

    const statusAnterior = ticket.status;
    const statusNovo = status;

    const updatedTicket = await ticketRepository.update(ticket.id, {
      status: statusNovo,
    });

    await ticketHistoryRepository.create({
      ticket: { connect: { id: ticket.id } },
      user: { connect: { id: userId } },
      statusAnterior,
      statusNovo,
    });

    return res.status(200).json(updatedTicket);
  } catch (error) {
    console.error("Erro no updateTicketStatus:", error);
    return res.status(500).json({
      message: "Erro ao atualizar status do ticket",
      error: error instanceof Error ? error.message : error,
    });
  }
}

