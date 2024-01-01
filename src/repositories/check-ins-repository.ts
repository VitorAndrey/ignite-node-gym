import { CheckIn, CreateCheckIn } from "@/models";

export interface CheckInsRepository {
  create(data: CreateCheckIn): Promise<CheckIn>;
}
