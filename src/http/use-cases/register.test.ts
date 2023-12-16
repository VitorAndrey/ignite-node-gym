import { describe, it } from "vitest";
import { RegisterUseCase } from "./register";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";

describe("Register Use Case", () => {
  it("should hash user password upon registration", async () => {
    const prismaUsersRepository = new PrismaUsersRepository();
    const registerUseCase = new RegisterUseCase(prismaUsersRepository);

    await registerUseCase.execute({
      name: "Jhon Doe",
      email: "jhon@exemple.com",
      password: "123456",
    });
  });
});
