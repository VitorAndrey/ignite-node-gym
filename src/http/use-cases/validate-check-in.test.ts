import { describe, beforeEach, afterEach, it, expect } from "vitest";
import { ValidateCheckInsUseCase } from "./validate-check-in";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-in-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found";

let checkInsRepository: InMemoryCheckInsRepository;
let sut: ValidateCheckInsUseCase;

describe("Validate Check In Use Case", () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository();
    sut = new ValidateCheckInsUseCase(checkInsRepository);

    // vi.useFakeTimers();
  });

  afterEach(() => {
    // vi.useRealTimers();
  });

  it("should be able to validate check-in", async () => {
    const createdCheckIn = await checkInsRepository.create({
      gym_id: "gym-01",
      user_id: "user-01",
    });

    const { checkIn } = await sut.execute({
      checkInId: createdCheckIn.id,
    });

    expect(checkIn.validated_at).toEqual(expect.any(Date));
    expect(checkInsRepository.checkInsTable[0].validated_at).toEqual(
      expect.any(Date)
    );
  });

  it("should not be able to validate inexistent check-in", async () => {
    await expect(async () => {
      await sut.execute({
        checkInId: "inexistent",
      });
    }).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
