import { Request, Response } from "express";
import { ShowBusiness } from "../business/ShowBusiness";
import {
  IBuyTicketInputDTO,
  ICreateInputDTO,
  IDeleteTicketInputDTO,
} from "../models/Show";

export class ShowController {
  constructor(private showBusiness: ShowBusiness) {}

  public create = async (req: Request, res: Response) => {
    try {
      const input: ICreateInputDTO = {
        token: req.headers.authorization as string,
        band: req.body.band,
        startsAt: req.body.startsAt,
      };
      const response = await this.showBusiness.create(input);
      res.status(201).send(response);
    } catch (error: any) {
      res.status(500).send({ message: error.message });
    }
  };

  public getShows = async (req: Request, res: Response) => {
    try {
      const response = await this.showBusiness.getShows();
      res.status(201).send(response);
    } catch (error: any) {
      res.status(500).send({ message: error.message });
    }
  };

  public buyTicket = async (req: Request, res: Response) => {
    try {
      const input: IBuyTicketInputDTO = {
        token: req.headers.authorization as string,
        showId: req.params.id,
      };

      const response = await this.showBusiness.buyTicket(input);
      res.status(201).send(response);
    } catch (error: any) {
      res.status(500).send({ message: error.message });
    }
  };

  public deleteTicket = async (req: Request, res: Response) => {
    try {
      const input: IDeleteTicketInputDTO = {
        token: req.headers.authorization as string,
        showId: req.params.id,
      };

      const response = await this.showBusiness.deleteTicket(input);
      res.status(201).send(response);
    } catch (error: any) {
      res.status(500).send({ message: error.message });
    }
  };
}
