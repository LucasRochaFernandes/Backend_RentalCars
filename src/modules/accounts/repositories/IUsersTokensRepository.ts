import { ICreateUsersTokensDTO } from "../dtos/ICreateUsersTokensDTO";
import { User } from "../infra/typeorm/entities/User";
import { UserTokens } from "../infra/typeorm/entities/UserTokens";

export interface IUsersTokensRepository {
  create(data: ICreateUsersTokensDTO): Promise<UserTokens>;
  findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<UserTokens>;
  deleteById(userToken_id: string): Promise<void>;
  findUserByRefreshToken(token: string): Promise<UserTokens>;
}
