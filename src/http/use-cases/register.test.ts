import { compare } from "bcryptjs";
import { RegisterUseCase } from "./register";
import { describe, expect, it, beforeEach } from "vitest";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";

let usersRepository: InMemoryUsersRepository;
let sut: RegisterUseCase;

describe("Register Use Case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new RegisterUseCase(usersRepository);
  });

  it("should be able to register", async () => {
    const { user } = await sut.execute({
      name: "Jhon Doe",
      email: "jhon@register.com",
      password: "123456",
    });

    expect(user.id).toBeTruthy();
  });

  it("should hash user password in registration", async () => {
    const { user } = await sut.execute({
      name: "Jhon Doe",
      email: "jhon@hash.com",
      password: "123456",
    });

    const isPasswordCorrectlyHashed = await compare(
      "123456",
      user.password_hash
    );

    expect(isPasswordCorrectlyHashed).toBe(true);
  });

  it("should not be able to register with same email twice", async () => {
    const user = {
      name: "Jhon Doe",
      email: "jhon@duplicate.com",
      password: "123456",
    };

    await sut.execute(user);

    await expect(async () => await sut.execute(user)).rejects.toBeInstanceOf(
      UserAlreadyExistsError
    );
  });
});
