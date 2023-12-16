import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users";
import { AuthenticateUseCase } from "./authenticate";
import { expect, describe, it } from "vitest";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";
import { hash } from "bcryptjs";
import { z } from "zod";

describe("Authenticate Use Case", async () => {
  const usersRepository = new InMemoryUsersRepository();
  const authenticateUseCase = new AuthenticateUseCase(usersRepository);

  await usersRepository.create({
    name: "Jhon Doe",
    email: "jhon@example.com",
    password_hash: await hash("123456", 6),
  });

  it("should be able to authenticate", async () => {
    const { user } = await authenticateUseCase.execute({
      email: "jhon@example.com",
      password: "123456",
    });

    const parsedUser = z
      .object({
        id: z.string(),
        name: z.string(),
        email: z.string(),
        password_hash: z.string(),
        created_at: z.date(),
      })
      .safeParse(user);

    expect(parsedUser.success).toBe(true);
  });

  it("should not be able to authenticate with invalid email", async () => {
    await expect(
      async () =>
        await authenticateUseCase.execute({
          email: "not@regitered.com",
          password: "123456",
        })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it("should not be able to authenticate with invalid password", async () => {
    await expect(
      async () =>
        await authenticateUseCase.execute({
          email: "jhon@example.com",
          password: "wrong_password",
        })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
