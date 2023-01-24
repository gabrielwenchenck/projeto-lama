import {
  IDeleteTicketInputDTO,
  ITicketDB,
  ITicketOutputDTO,
} from "./../models/Show";
import { ConflictError } from "./../errors/ConflictError";
import { NotFoundError } from "./../errors/NotFoundError";
import { USER_ROLES } from "./../models/User";
import { ShowDatabase } from "../database/ShowDatabase";
import { AuthorizationError } from "../errors/AuthorizationError";
import {
  IBuyTicketInputDTO,
  ICreateInputDTO,
  ICreateOutputDTO,
  IGetShowsOutputDTO,
  Show,
} from "../models/Show";
import { Authenticator } from "../services/Authenticator";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";
import { ParamsError } from "../errors/ParamsError";

export class ShowBusiness {
  constructor(
    private showDatabase: ShowDatabase,
    private idGenerator: IdGenerator,
    private authenticator: Authenticator
  ) {}

  public create = async (input: ICreateInputDTO) => {
    const { token, band, startsAt } = input;

    if (!band || !startsAt) {
      throw new ParamsError();
    }

    if (!token) {
      throw new AuthorizationError();
    }

    const payload = this.authenticator.getTokenPayload(token);

    if (!payload) {
      throw new NotFoundError("Usuário não encontrado");
    }

    if (payload.role !== USER_ROLES.ADMIN) {
      throw new AuthorizationError("Somente administradores podem criar shows");
    }

    const startsAtDate = new Date(startsAt);

    const festivalStartDate = new Date("2022/12/05");

    if (startsAtDate < festivalStartDate) {
      throw new ParamsError("A data do show deve ser anterior à 05/12/2022");
    }
    console.log(startsAtDate);

    const showDateExists = await this.showDatabase.findShowByDate(startsAtDate);

    if (showDateExists) {
      throw new ConflictError("Data já utilizada");
    }

    const id = this.idGenerator.generate();
    const show = new Show(id, band, startsAtDate);

    await this.showDatabase.createShow(show);

    const response: ICreateOutputDTO = {
      message: "Show criado com sucesso",
      show,
    };

    return response;
  };

  public getShows = async (): Promise<IGetShowsOutputDTO> => {
    const showDB = await this.showDatabase.getShows();

    const response: IGetShowsOutputDTO = {
      shows: showDB,
    };
    return response;
  };

  public buyTicket = async (
    input: IBuyTicketInputDTO
  ): Promise<ITicketOutputDTO> => {
    const { token, showId } = input;

    if (!showId) {
      throw new ParamsError("Show não encontrado");
    }

    if (!token) {
      throw new AuthorizationError();
    }

    const payload = this.authenticator.getTokenPayload(token);

    if (!payload) {
      throw new NotFoundError("Usuário não encontrado");
    }

    const showDB = await this.showDatabase.findShowById(showId);

    if (!showDB) {
      throw new NotFoundError("Show não encontrado");
    }

    const tickets = await this.showDatabase.getTicketsByShowId(showId);

    const show = new Show(
      showDB.id,
      showDB.band,
      showDB.starts_at,
      5000 - tickets
    );

    if (show.getTickets() === 0) {
      throw new Error("Ingressos esgotados");
    }

    const ticketAlreadyExists = await this.showDatabase.findTicket(
      showId,
      payload.id
    );

    if (ticketAlreadyExists) {
      throw new ConflictError("Você já comprou o ingresso para esse show");
    }

    const id = this.idGenerator.generate();

    const ticket: ITicketDB = {
      id,
      show_id: showId,
      user_id: payload.id,
    };

    await this.showDatabase.createTicket(ticket);
    const response: ITicketOutputDTO = {
      message: "Ingresso comprado com sucesso",
      band: show.getBand(),
      showDate: show.getStartsAt(),
    };
    return response;
  };

  public deleteTicket = async (input: IDeleteTicketInputDTO) => {
    const { token, showId } = input;

    if (!showId) {
      throw new ParamsError("Show não encontrado");
    }

    if (!token) {
      throw new AuthorizationError();
    }

    const payload = this.authenticator.getTokenPayload(token);

    if (!payload) {
      throw new NotFoundError("Usuário não encontrado");
    }

    const showDB = await this.showDatabase.findShowById(showId);

    if (!showDB) {
      throw new NotFoundError("Show não encontrado");
    }

    const ticketDB = await this.showDatabase.findTicket(showId, payload.id);

    if (!ticketDB) {
      throw new ConflictError(
        "Você ainda não comprou o ingresso para esse show"
      );
    }

    await this.showDatabase.deleteTicketById(ticketDB.id);

    const response = { message: "Ingresso cancelado com sucesso" };
    return response;
  };
}
