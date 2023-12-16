import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users";
import { AuthenticateUseCase } from "./authenticate";
import { expect, describe, it, beforeEach } from "vitest";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";
import { hash } from "bcryptjs";

let usersRepository: InMemoryUsersRepository;
let sut: AuthenticateUseCase;

describe("Authenticate Use Case", async () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new AuthenticateUseCase(usersRepository);
  });

  it("should be able to authenticate", async () => {
    await usersRepository.create({
      name: "Jhon Doe",
      email: "jhon@example.com",
      password_hash: await hash("123456", 6),
    });

    const { user } = await sut.execute({
      email: "jhon@example.com",
      password: "123456",
    });

    expect(user.id).toBeTruthy();
  });

  it("should not be able to authenticate with invalid email", async () => {
    await expect(
      async () =>
        await sut.execute({
          email: "not@regitered.com",
          password: "123456",
        })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it("should not be able to authenticate with invalid password", async () => {
    await expect(
      async () =>
        await sut.execute({
          email: "jhon@example.com",
          password: "wrong_password",
        })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
