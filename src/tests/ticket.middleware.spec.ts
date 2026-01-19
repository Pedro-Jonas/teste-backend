import { checkResponsibleSector } from "../middlewares/tickets.Middlewares";
import { UserRepository } from "../repositories/user.Repositories";

describe("Middleware checkResponsibleSector", () => {
  let req: any;
  let res: any;
  let next: jest.Mock;
  let userRepoMock: jest.Mocked<UserRepository>;

  beforeEach(() => {
    userRepoMock = {
      findById: jest.fn(),
    } as any;

    req = {
      body: { status: "EM_ANDAMENTO" },
      locals: { userId: 1 },
      ticket: { setorResponsavelId: 2 }, 
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    next = jest.fn();
  });

  it("bloqueia atualização se usuário não for do setor responsável", async () => {
    userRepoMock.findById.mockResolvedValue({
      id: 1,
      name: "Usuário Teste",
      sectorId: 1,
    });

    await checkResponsibleSector(req, res, next, userRepoMock);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({
      message: "Apenas o setor responsável pode alterar para este status",
    });
    expect(next).not.toHaveBeenCalled();
  });

  it("permite atualização se usuário for do setor responsável", async () => {
    req.ticket.setorResponsavelId = 1; 
    userRepoMock.findById.mockResolvedValue({
      id: 1,
      name: "Usuário Teste",
      sectorId: 1,
    });

    await checkResponsibleSector(req, res, next, userRepoMock);

    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });

  it("retorna 404 se usuário não existir", async () => {
    userRepoMock.findById.mockResolvedValue(null);

    await checkResponsibleSector(req, res, next, userRepoMock);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "Usuário não encontrado" });
    expect(next).not.toHaveBeenCalled();
  });
});
