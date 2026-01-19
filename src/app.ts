import express from "express";
import cors from "cors";
import ticketRoutes from "../src/routes/tickets.Routes";

export const app = express();

app.use(express.json());
app.use(cors());
app.use(ticketRoutes);
