import { CreateGym, Gym } from "@/models";
import { GymsRepository } from "../gyms-repository";
import { randomUUID } from "crypto";
import { Decimal } from "@prisma/client/runtime/library";

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
}
