import { CreateUser, User } from "@/models";
import { UsersRepository } from "../users-respository";
import { randomUUID } from "node:crypto";

export class InMemoryUsersRepository implements UsersRepository {
  public usersTable: User[] = [];

  async create(data: CreateUser) {
    const user = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      created_at: new Date(),
    };

    this.usersTable.push(user);

    return user;
  }

  async findByEmail(email: string) {
    const user = this.usersTable.find((user) => user.email === email);

    if (!user) return null;

    return user;
  }

  async findById(id: string) {
    const user = this.usersTable.find((user) => user.id === id);

    if (!user) return null;

    return user;
  }
}
