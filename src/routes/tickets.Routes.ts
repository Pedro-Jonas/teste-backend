import express from 'express';
import * as ticketController from '../controllers/tickets.Controller';

import { 
    validateTicketCreation, 
    validateTicketUpdate,
    checkTicketExists,
    preventEditClosedTickets,
    checkResponsibleSector,
} 
from '../middlewares/tickets.Middlewares';

const router = express.Router();

router.post(
    '/tickets/user/:userId',
    validateTicketCreation,
    ticketController.postTicket
);

router.get(
    '/tickets',
     ticketController.getTickets
);

router.put(
  "/tickets/:ticketId/user/:userId",
  validateTicketUpdate,      
  checkTicketExists,           
  preventEditClosedTickets,   
  checkResponsibleSector,      
  ticketController.updateTicketStatus       
);

export default router;