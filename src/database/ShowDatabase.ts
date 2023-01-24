import { IShowDB, ITicketDB, Show } from "../models/Show";
import { BaseDatabase } from "./BaseDatabase";

export class ShowDatabase extends BaseDatabase {
  public static TABLE_SHOWS = "Lama_Shows";
  public static TABLE_TICKETS = "Lama_Tickets";

  public toShowDBModel = (show: Show): IShowDB => {
    const showDB: IShowDB = {
      id: show.getId(),
      band: show.getBand(),
      starts_at: show.getStartsAt(),
    };
    return showDB;
  };

  public findShowByDate = async (date: Date): Promise<IShowDB | undefined> => {
    const result: IShowDB[] = await BaseDatabase.connection(
      ShowDatabase.TABLE_SHOWS
    )
      .select()
      .where({ starts_at: date });

    return result[0];
  };

  public createShow = async (show: Show): Promise<void> => {
    const showDB = this.toShowDBModel(show);

    await BaseDatabase.connection(ShowDatabase.TABLE_SHOWS).insert(showDB);
  };

  public getShows = async (): Promise<Show[]> => {
    const result: IShowDB[] = await BaseDatabase.connection(
      ShowDatabase.TABLE_SHOWS
    ).select();
    const showModel = result.map((show) => {
      return new Show(show.id, show.band, show.starts_at);
    });
    return showModel;
  };

  public findShowById = async (id: string): Promise<IShowDB | undefined> => {
    const result: IShowDB[] = await BaseDatabase.connection(
      ShowDatabase.TABLE_SHOWS
    )
      .select()
      .where({ id });

    return result[0];
  };

  public getTicketsByShowId = async (id: string): Promise<number> => {
    const result = await BaseDatabase.connection(ShowDatabase.TABLE_TICKETS)
      .select()
      .where({ show_id: id });

    return result.length;
  };

  public findTicket = async (
    showId: string,
    userId: string
  ): Promise<ITicketDB | undefined> => {
    const result: ITicketDB[] = await BaseDatabase.connection(
      ShowDatabase.TABLE_TICKETS
    )
      .select()
      .where({ show_id: showId })
      .andWhere({ user_id: userId });

    return result[0];
  };
  public createTicket = async (ticket: ITicketDB): Promise<void> => {
    await BaseDatabase.connection(ShowDatabase.TABLE_TICKETS).insert(ticket);
  };
  public deleteTicketById = async (id: string): Promise<void> => {
    await BaseDatabase.connection(ShowDatabase.TABLE_TICKETS)
      .delete()
      .where({ id });
  };
}
