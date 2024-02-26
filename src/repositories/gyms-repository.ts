import { Gym, CreateGym } from "@/models";

export interface GymsRepository {
  findById(id: string): Promise<Gym | null>;
  create(data: CreateGym): Promise<Gym>;
}
