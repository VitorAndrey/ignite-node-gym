import { CheckIn, CreateCheckIn } from "@/models";

type FindByUserIdOnDate = {
  userId: string;
  date: Date;
};

export interface CheckInsRepository {
  findById(id: string): Promise<CheckIn | null>;
  findByUserIdOnDate(data: FindByUserIdOnDate): Promise<CheckIn | null>;
  countByUserId(userId: string): Promise<number>;
  findManyByUserId(userId: string, page: number): Promise<CheckIn[]>;
  create(data: CreateCheckIn): Promise<CheckIn>;
  save(checkIn: CheckIn): Promise<CheckIn>;
}
