import { AuthenticatorMock } from "./../mocks/AuthenticatorMock";
import { IdGeneratorMock } from "./../mocks/IdGeneratorMock";
import { ShowDatabaseMock } from "./../mocks/ShowDatabaseMock";
import { ShowBusiness } from "./../../src/business/ShowBusiness";

describe("Testanto getShows da ShowBusiness", () => {
  const showBusiness = new ShowBusiness(
    new ShowDatabaseMock(),
    new IdGeneratorMock(),
    new AuthenticatorMock()
  );

  test("Caso de sucesso", async () => {
    const result = await showBusiness.getShows();
    expect(result.shows.length).toEqual(2);
    expect(result.shows[0].getBand()).toEqual("Led Zeppelin");
  });
});
