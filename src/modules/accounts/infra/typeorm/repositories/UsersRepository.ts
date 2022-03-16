import { getRepository, Repository } from "typeorm";
import { ICreateUserDTO } from "../../../dtos/ICreateUserDTO";
import { User } from "../entities/User";
import { IUsersRepository } from "../../../repositories/IUsersRepository";

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  public constructor() {
    this.repository = getRepository(User);
  }
  async findById(user_id: string): Promise<User> {
    return await this.repository.findOne(user_id);
  }
  async findByEmail(email: string): Promise<User> {
    return await this.repository.findOne({ email });
  }

  async create({
    name,
    email,
    password,
    driver_license,
    id,
    avatar,
  }: ICreateUserDTO): Promise<void> {
    const newUser = this.repository.create({
      name,
      email,
      password,
      driver_license,
      avatar,
      id,
    });

    await this.repository.save(newUser);
  }
}
