import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users";
import { describe, it, expect, beforeEach } from "vitest";
import { GetUserProfileUseCase } from "./get-user-profile";
import { hash } from "bcryptjs";
import { ResourceNotFoundError } from "./errors/resource-not-found";

let usersRepository: InMemoryUsersRepository;
let sut: GetUserProfileUseCase;

describe("Get User Profile Use Case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new GetUserProfileUseCase(usersRepository);
  });

  it("should be able to get user profile", async () => {
    const createdUser = await usersRepository.create({
      name: "Jhon Doe",
      email: "jhon@doe.com",
      password_hash: await hash("123456", 6),
    });

    const { user } = await sut.execute({
      userId: createdUser.id,
    });

    expect(user.name).toEqual("Jhon Doe");
  });

  it("should not be able to get user profile with wrong id", async () => {
    expect(async () => {
      await sut.execute({
        userId: "non-existing-id",
      });
    }).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
