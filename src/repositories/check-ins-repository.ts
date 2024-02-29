import { CheckIn, CreateCheckIn } from "@/models";

type FindByUserIdOnDate = {
  userId: string;
  date: Date;
};

export interface CheckInsRepository {
  create(data: CreateCheckIn): Promise<CheckIn>;
  findByUserIdOnDate(data: FindByUserIdOnDate): Promise<CheckIn | null>;
  findManyByUserId(userId: string, page: number): Promise<CheckIn[]>;
}
