import { Gym, CreateGym } from "@/models";

type FindMany = {
  query: string;
  page: number;
};

export interface GymsRepository {
  findById(id: string): Promise<Gym | null>;
  searchMany({ query, page }: FindMany): Promise<Gym[]>;
  create(data: CreateGym): Promise<Gym>;
}
