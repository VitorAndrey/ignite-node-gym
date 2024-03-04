import { CreateGym, Gym } from "@/models";
import { FindManyNearbyParams, GymsRepository } from "../gyms-repository";
import { randomUUID } from "crypto";
import { Decimal } from "@prisma/client/runtime/library";
import { getDistanceBetweenCoordinates } from "@/utils/get-distance-between-coordinates";

export class InMemoryGymsRepository implements GymsRepository {
  public gymsTable: Gym[] = [];

  async findById(id: string) {
    const gym = this.gymsTable.find((gym) => gym.id === id);

    if (!gym) return null;

    return gym;
  }

  async create(data: CreateGym) {
    const gym = {
      id: data.id ?? randomUUID(),
      title: data.title,
      latitude: new Decimal(data.latitude.toString()),
      longitude: new Decimal(data.longitude.toString()),
      description: data.description ?? null,
      phone: data.phone ?? null,
      created_at: new Date(),
    };

    this.gymsTable.push(gym);

    return gym;
  }

  async searchMany({ query, page }: { query: string; page: number }) {
    const gym = this.gymsTable
      .filter((item) => item.title.includes(query))
      .slice((page - 1) * 20, page * 20);

    return gym;
  }

  async findManyNearby(data: FindManyNearbyParams) {
    return this.gymsTable.filter((item) => {
      const distance = getDistanceBetweenCoordinates(
        {
          latitude: data.latitude,
          longitude: data.longitude,
        },
        {
          latitude: item.latitude.toNumber(),
          longitude: item.longitude.toNumber(),
        }
      );

      return distance < 10;
    });
  }
}
