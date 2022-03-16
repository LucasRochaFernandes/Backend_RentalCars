import { ICreateUsersTokensDTO } from "@modules/accounts/dtos/ICreateUsersTokensDTO";
import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { UserTokens } from "@modules/accounts/infra/typeorm/entities/UserTokens";
import { IUsersTokensRepository } from "../IUsersTokensRepository";

export class UsersTokensRepositoryInMemory implements IUsersTokensRepository {
  private userTokens: UserTokens[] = [];
  async findUserByRefreshToken(token: string): Promise<UserTokens> {
    return this.userTokens.find(
      (userTokens) => userTokens.refresh_token === token
    );
  }

  async findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<UserTokens> {
    return this.userTokens.find(
      (userTokens) =>
        userTokens.user_id === user_id &&
        userTokens.refresh_token === refresh_token
    );
  }
  async deleteById(userToken_id: string): Promise<void> {
    // this.userTokens = this.userTokens.filter(
    //   (userToken) => userToken.id !== userToken_id
    // );

    const userToken = this.userTokens.findIndex(
      (usertoken) => usertoken.id === userToken_id
    );
    this.userTokens.splice(userToken);
  }

  async create(data: ICreateUsersTokensDTO): Promise<UserTokens> {
    const newUserTokens = new UserTokens();
    Object.assign(newUserTokens, data);
    this.userTokens.push(newUserTokens);
    return newUserTokens;
  }
}
