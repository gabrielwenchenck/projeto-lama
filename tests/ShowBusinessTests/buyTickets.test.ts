import { BaseError } from "./../../src/errors/BaseError";
import { IBuyTicketInputDTO, ICreateInputDTO } from "./../../src/models/Show";
import { AuthenticatorMock } from "./../mocks/AuthenticatorMock";
import { IdGeneratorMock } from "./../mocks/IdGeneratorMock";
import { ShowDatabaseMock } from "./../mocks/ShowDatabaseMock";
import { ShowBusiness } from "./../../src/business/ShowBusiness";

describe("Testanto buyTicket da ShowBusiness", () => {
  const showBusiness = new ShowBusiness(
    new ShowDatabaseMock(),
    new IdGeneratorMock(),
    new AuthenticatorMock()
  );

  test("Caso de sucesso", async () => {
    const input: IBuyTicketInputDTO = {
      token: "token-mock-normal",
      showId: "201",
    };

    const result = await showBusiness.buyTicket(input);
    expect(result.message).toEqual("Ingresso comprado com sucesso");
    expect(result.band).toEqual("Foo Fighters");
    expect(result.showDate).toEqual(new Date("2022/12/05"));
  });

  test("Caso de erro, show não encontrado", async () => {
    expect.assertions(2);
    try {
      const input: IBuyTicketInputDTO = {
        token: "token-mock-normal",
        showId: "123",
      };
      await showBusiness.buyTicket(input);
    } catch (error) {
      if (error instanceof BaseError) {
        expect(error.message).toEqual("Show não encontrado");
        expect(error.statusCode).toEqual(404);
      }
    }
  });
});
