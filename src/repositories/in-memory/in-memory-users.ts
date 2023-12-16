import { CreateUser, User } from "@/models";
import { UsersRepository } from "../users-respository";

export class InMemoryUsersRepository implements UsersRepository {
  public usersTable: User[] = [];

  async findByEmail(email: string) {
    const user = this.usersTable.find((user) => user.email === email);

    if (!user) return null;

    return user;
  }

  async create(data: CreateUser) {
    const user = {
      id: "user-1",
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      created_at: new Date(),
    };

    this.usersTable.push(user);

    return user;
  }
}
