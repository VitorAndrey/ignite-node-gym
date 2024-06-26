import { CheckIn, CreateCheckIn } from "@/models";
import { CheckInsRepository } from "../check-ins-repository";
import { randomUUID } from "node:crypto";
import dayjs from "dayjs";

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

  async findByUserIdOnDate({ userId, date }: { userId: string; date: Date }) {
    const startOfTheDay = dayjs(date).startOf("date");
    const endOfTheDay = dayjs(date).endOf("date");

    const checkOnSameDate = this.checkInsTable.find((checkIn) => {
      const checkInDate = dayjs(checkIn.created_at);
      const isOnSameDate =
        checkInDate.isAfter(startOfTheDay) && checkInDate.isBefore(endOfTheDay);

      return checkIn.user_id === userId && isOnSameDate;
    });

    if (!checkOnSameDate) return null;

    return checkOnSameDate;
  }

  async findManyByUserId(userId: string, page: number) {
    return this.checkInsTable
      .filter((item) => userId === item.user_id)
      .slice((page - 1) * 20, page * 20);
  }

  async countByUserId(userId: string) {
    return this.checkInsTable.filter((item) => item.user_id === userId).length;
  }

  async findById(id: string) {
    return this.checkInsTable.find((item) => item.id === id) || null;
  }

  async save(checkIn: CheckIn) {
    const checkInIndex = this.checkInsTable.findIndex(
      (item) => item.id === checkIn.id
    );

    if (checkInIndex >= 0) {
      this.checkInsTable[checkInIndex] = checkIn;
    }

    return checkIn;
  }
}
