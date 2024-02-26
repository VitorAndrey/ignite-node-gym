import { describe, beforeEach, afterEach, it, expect, vi } from "vitest";
import { CheckInsUseCase } from "./check-in";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-in-repository";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { Decimal } from "@prisma/client/runtime/library";
import { MaxNumberOfCheckInsError } from "./errors/max-number-of-check-ins-error";
import { MaxDistanceError } from "./errors/max-distance-error";

let checkInsRepository: InMemoryCheckInsRepository;
let gymsRepository: InMemoryGymsRepository;
let sut: CheckInsUseCase;

describe("Check In Use Case", () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository();
    gymsRepository = new InMemoryGymsRepository();

    sut = new CheckInsUseCase(checkInsRepository, gymsRepository);

    await gymsRepository.create({
      id: "gym-01",
      title: "Java Gym",
      description: "Best gym",
      latitude: -27.2892052,
      longitude: -49.6481891,
      phone: "9999999",
    });

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should be able to check in", async () => {
    const { checkIn } = await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
      userLocation: {
        latitude: -27.2892052,
        longitude: -49.6481891,
      },
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it("should not be able to check in twice in the same day", async () => {
    vi.setSystemTime(new Date(2024, 1, 15, 8, 0, 0));

    await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
      userLocation: {
        latitude: -27.2892052,
        longitude: -49.6481891,
      },
    });

    await expect(() =>
      sut.execute({
        gymId: "gym-01",
        userId: "user-01",
        userLocation: {
          latitude: -27.2892052,
          longitude: -49.6481891,
        },
      })
    ).rejects.toBeInstanceOf(MaxNumberOfCheckInsError);
  });

  it("should be able to check in twice in different days", async () => {
    vi.setSystemTime(new Date(2024, 1, 15, 8, 0, 0));

    await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
      userLocation: {
        latitude: -27.2892052,
        longitude: -49.6481891,
      },
    });

    vi.setSystemTime(new Date(2024, 1, 16, 8, 0, 0));

    const { checkIn } = await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
      userLocation: {
        latitude: -27.2892052,
        longitude: -49.6481891,
      },
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it("should not be able to check in on distant gym", async () => {
    gymsRepository.gymsTable.push({
      id: "gym-02",
      title: "Python gym",
      description: "",
      latitude: new Decimal(-27.0747279),
      longitude: new Decimal(-49.4889672),
      phone: "",
    });

    await expect(() =>
      sut.execute({
        gymId: "gym-02",
        userId: "user-01",
        userLocation: {
          latitude: -27.2029052,
          longitude: -49.6401091,
        },
      })
    ).rejects.toBeInstanceOf(MaxDistanceError);
  });
});
