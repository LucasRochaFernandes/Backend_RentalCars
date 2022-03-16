import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { User } from "../../infra/typeorm/entities/User";
import { IUsersRepository } from "../IUsersRepository";

export class UsersRepositoryInMemory implements IUsersRepository {
  users: User[] = [];
  async create({
    name,
    email,
    password,
    driver_license
  }: ICreateUserDTO): Promise<void> {
    const newUser = new User();

    Object.assign(newUser, {
      name,
      email,
      password,
      driver_license
    });
    this.users.push(newUser);
  }
  async findByEmail(email: string): Promise<User> {
    return this.users.find((user) => user.email === email);
  }
  async findById(user_id: string): Promise<User> {
    return this.users.find((user) => user.id === user_id);
  }
}
