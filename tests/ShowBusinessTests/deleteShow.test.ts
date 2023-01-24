import { BaseError } from "./../../src/errors/BaseError";
import { AuthenticatorMock } from "./../mocks/AuthenticatorMock";
import { IdGeneratorMock } from "./../mocks/IdGeneratorMock";
import { ShowDatabaseMock } from "./../mocks/ShowDatabaseMock";
import { ShowBusiness } from "./../../src/business/ShowBusiness";
import { IDeleteTicketInputDTO } from "../../src/models/Show";

describe("Testanto deleteShows da ShowBusiness", () => {
  const showBusiness = new ShowBusiness(
    new ShowDatabaseMock(),
    new IdGeneratorMock(),
    new AuthenticatorMock()
  );

  test("Caso de sucesso", async () => {
    const input: IDeleteTicketInputDTO = {
      token: "token-mock-admin",
      showId: "",
    };
    const result = await showBusiness.deleteTicket(input);
    expect(result.message).toEqual("Ingresso cancelado com sucesso");
  });

  test("Erro ao tentar deletar o ticket", async () => {
    expect.assertions(2);
    try {
      const input: IDeleteTicketInputDTO = {
        token: "token-mock-admin",
        showId: "",
      };
      await showBusiness.deleteTicket(input);
    } catch (error) {
      if (error instanceof BaseError) {
        expect(error.message).toEqual("Show não encontrado");
        expect(error.statusCode).toEqual(400);
      }
    }
  });
});
