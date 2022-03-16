import auth from "@config/auth";
import { ICreateUsersTokensDTO } from "@modules/accounts/dtos/ICreateUsersTokensDTO";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { verify } from "jsonwebtoken";
import { getRepository, Repository } from "typeorm";
import { User } from "../entities/User";
import { UserTokens } from "../entities/UserTokens";

export class UsersTokensRepository implements IUsersTokensRepository {
  private repository: Repository<UserTokens>;

  constructor() {
    this.repository = getRepository(UserTokens);
  }
  async findUserByRefreshToken(token: string): Promise<UserTokens> {
    return await this.repository.findOne({ refresh_token: token });
  }
  async deleteById(userToken_id: string): Promise<void> {
    await this.repository.delete(userToken_id);
  }
  async findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<UserTokens> {
    return await this.repository.findOne({ user_id, refresh_token });
  }

  async create(data: ICreateUsersTokensDTO): Promise<UserTokens> {
    const newUserTokens = this.repository.create(data);
    await this.repository.save(newUserTokens);

    return newUserTokens;
  }
}
