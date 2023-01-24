import { ShowDatabase } from "./../../src/database/ShowDatabase";
import { Show, IShowDB, ITicketDB } from "./../../src/models/Show";
import { BaseDatabase } from "../../src/database/BaseDatabase";

export class ShowDatabaseMock extends BaseDatabase {
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
    switch (date.getDate()) {
      case 5:
        return {
          id: "8614ecec-202d-4b4e-8241-3035d856b94b",
          band: "Led Zeppelin",
          starts_at: new Date("2023/01/13"),
        };
      default:
        return undefined;
    }
  };

  public createShow = async (show: Show): Promise<void> => {};

  public getShows = async (): Promise<Show[]> => {
    const shows = [
      {
        id: "8614ecec-202d-4b4e-8241-3035d856b94b",
        band: "Led Zeppelin",
        starts_at: new Date("2023/01/13"),
      },
      {
        id: "e8c2aef6-016c-4063-a31b-15f9c2534af8",
        band: "Pink Floyd",
        starts_at: new Date("2023/01/16"),
      },
    ];

    const showsModel = shows.map((show) => {
      return new Show(show.id, show.band, show.starts_at);
    });
    return showsModel;
  };

  public findShowById = async (id: string): Promise<IShowDB | undefined> => {
    switch (id) {
      case "201":
        return {
          id: "201",
          band: "Foo Fighters",
          starts_at: new Date("2022/12/05"),
        };
      default:
        return undefined;
    }
  };

  public getTicketsByShowId = async (id: string): Promise<number> => {
    switch (id) {
      case "e8c2aef6-016c-4063-a31b-15f9c2534af8":
        return 3;
      default:
        return 0;
    }
  };

  public findTicket = async (
    showId: string,
    userId: string
  ): Promise<ITicketDB | undefined> => {
    if (showId === "201") {
      switch (userId) {
        case "101":
          return {
            id: "301",
            show_id: "201",
            user_id: "101",
          };
        default:
          break;
      }
      return undefined;
    }
  };
  public createTicket = async (ticket: ITicketDB): Promise<void> => {};
  public deleteTicketById = async (id: string): Promise<void> => {};
}
