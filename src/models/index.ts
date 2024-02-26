import {
  User as PrismaUser,
  Gym as PrismaGym,
  CheckIn as PrismaCheckIn,
  Prisma,
} from "@prisma/client";

export type User = PrismaUser;
export type CreateUser = Prisma.UserCreateInput;

export type Gym = PrismaGym;
export type CreateGym = Prisma.GymCreateInput;

export type CheckIn = PrismaCheckIn;
export type CreateCheckIn = Prisma.CheckInUncheckedCreateInput;
