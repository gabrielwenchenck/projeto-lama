import { BaseError } from "./../../src/errors/BaseError";
import { ICreateInputDTO } from "./../../src/models/Show";
import { AuthenticatorMock } from "./../mocks/AuthenticatorMock";
import { IdGeneratorMock } from "./../mocks/IdGeneratorMock";
import { ShowDatabaseMock } from "./../mocks/ShowDatabaseMock";
import { ShowBusiness } from "./../../src/business/ShowBusiness";

describe("Testanto create da ShowBusiness", () => {
  const showBusiness = new ShowBusiness(
    new ShowDatabaseMock(),
    new IdGeneratorMock(),
    new AuthenticatorMock()
  );

  test("Caso de sucesso", async () => {
    const input: ICreateInputDTO = {
      token: "token-mock-admin",
      band: "Queen",
      startsAt: "23/02/16",
    };

    const result = await showBusiness.create(input);
    expect(result.message).toEqual("Show criado com sucesso");
    expect(result.show.getBand()).toEqual("Queen");
  });

  test("Caso de erro, criando show com conta do tipo NORMAL", async () => {
    expect.assertions(2);

    try {
      const input: ICreateInputDTO = {
        token: "token-mock-normal",
        band: "Queen",
        startsAt: "23/02/16",
      };
      await showBusiness.create(input);
    } catch (error) {
      if (error instanceof BaseError) {
        expect(error.message).toEqual(
          "Somente administradores podem criar shows"
        );
        expect(error.statusCode).toEqual(403);
      }
    }
  });
});
