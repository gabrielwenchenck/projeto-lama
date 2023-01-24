import { BaseError } from "./../../src/errors/BaseError";
import { UserBusiness } from "../../src/business/UserBusiness";
import { ISignupInputDTO } from "../../src/models/User";
import { AuthenticatorMock } from ".././mocks/AuthenticatorMock";
import { HashManagerMock } from ".././mocks/HashManagerMock";
import { IdGeneratorMock } from ".././mocks/IdGeneratorMock";
import { UserDatabaseMock } from ".././mocks/UserDatabaseMock";

describe("Testando o método signup da UserBusiness", () => {
  const userBusiness = new UserBusiness(
    new UserDatabaseMock(),
    new IdGeneratorMock(),
    new HashManagerMock(),
    new AuthenticatorMock()
  );

  test("Um token é retornado quando o cadastro é bem-sucedido", async () => {
    const input: ISignupInputDTO = {
      email: "teste@gmail.com",
      name: "Teste",
      password: "teste123",
    };

    const response = await userBusiness.signup(input);
    expect(response.message).toBe("Cadastro realizado com sucesso");
    expect(response.token).toBe("token-mock-normal");
  });

  test("Erro quando é digitado um email já registrado", async () => {
    try {
      const input: ISignupInputDTO = {
        email: "teste@gmail.com",
        name: "Teste",
        password: "teste123",
      };
      await userBusiness.signup(input);
    } catch (error) {
      if (error instanceof BaseError) {
        expect(error.message).toEqual("Email já cadastrado");
        expect(error.statusCode).toEqual(409);
      }
    }
  });

  test("Erro quando é digitada uma senha com menos de 6 caracteres", async () => {
    try {
      const input: ISignupInputDTO = {
        email: "teste@gmail.com",
        name: "Teste",
        password: "123",
      };
      await userBusiness.signup(input);
    } catch (error) {
      if (error instanceof BaseError) {
        expect(error.message).toEqual(
          "Parâmetro 'password' inválido: mínimo de 6 caracteres"
        );
        expect(error.statusCode).toEqual(400);
      }
    }
  });
});
