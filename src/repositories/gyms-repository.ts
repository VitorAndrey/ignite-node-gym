import { Gym, CreateGym } from "@/models";

type FindManyParams = {
  query: string;
  page: number;
};

export type FindManyNearbyParams = {
  latitude: number;
  longitude: number;
};

export interface GymsRepository {
  findById(id: string): Promise<Gym | null>;
  findManyNearby(data: FindManyNearbyParams): Promise<Gym[]>;
  searchMany({ query, page }: FindManyParams): Promise<Gym[]>;
  create(data: CreateGym): Promise<Gym>;
}
