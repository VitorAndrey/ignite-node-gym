import { CheckIn, CreateCheckIn } from "@/models";
import { CheckInsRepository } from "../check-ins-repository";
import { randomUUID } from "node:crypto";

export class InMemoryCheckInsRepository implements CheckInsRepository {
  public checkInsTable: CheckIn[] = [];

  async create(data: CreateCheckIn) {
    const checkIn = {
      id: randomUUID(),
      user_id: data.user_id,
      gym_id: data.gym_id,
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
      created_at: new Date(),
    };

    this.checkInsTable.push(checkIn);

    return checkIn;
  }
}
