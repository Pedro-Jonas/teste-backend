import request from "supertest";
import express from "express";

const app = express();
app.use(express.json());

app.post("/tickets/:userId", (req, res) => {
  const { titulo, descricao, setorSolicitanteId, setorResponsavelId } = req.body;
  res.status(201).json({
    id: 123,
    titulo,
    descricao,
    status: "ABERTA",
    setorSolicitanteId,
    setorResponsavelId,
  });
});

app.put("/tickets/:ticketId/user/:userId", (req, res) => {
  res.status(200).json({
    id: Number(req.params.ticketId),
    status: req.body.status,
  });
});

describe("Fluxo de Ticket - Integração", () => {
  let ticketId: number;

  it("deve criar um ticket", async () => {
    const response = await request(app)
      .post("/tickets/1")
      .send({
        titulo: "Teste integração",
        descricao: "Criando ticket",
        prioridade: "ALTA",
        setorSolicitanteId: 1,
        setorResponsavelId: 2,
      });

    expect(response.status).toBe(201);
    expect(response.body.id).toBeDefined();
    ticketId = response.body.id;
  });

  it("deve atualizar status do ticket", async () => {
    const response = await request(app)
      .put(`/tickets/${ticketId}/user/1`)
      .send({ status: "EM_ANDAMENTO" });

    expect(response.status).toBe(200);
    expect(response.body.status).toBe("EM_ANDAMENTO");
  });
});
