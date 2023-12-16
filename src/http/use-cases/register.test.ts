import { compare } from "bcryptjs";
import { RegisterUseCase } from "./register";
import { describe, expect, it } from "vitest";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";
import { z } from "zod";

describe("Register Use Case", () => {
  const userRepository = new InMemoryUsersRepository();
  const registerUseCase = new RegisterUseCase(userRepository);

  const newUser = {
    name: "Jhon Doe",
    password: "123456",
    // add email later for each test case preventing unexpected user already exists error.
  };

  it("should be able to register", async () => {
    const email = "jhon@register.com";
    const { user } = await registerUseCase.execute({ ...newUser, email });

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

  it("should hash user password upon registration", async () => {
    const email = "jhon@hash.com";
    const { user } = await registerUseCase.execute({ ...newUser, email });

    const isPasswordCorrectlyHashed = await compare(
      newUser.password,
      user.password_hash
    );

    expect(isPasswordCorrectlyHashed).toBeTruthy();
  });

  it("should not be able to register with same email twice", async () => {
    const email = "jhon@duplicate.com";
    await registerUseCase.execute({ ...newUser, email });

    await expect(
      async () => await registerUseCase.execute({ ...newUser, email })
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });
});
