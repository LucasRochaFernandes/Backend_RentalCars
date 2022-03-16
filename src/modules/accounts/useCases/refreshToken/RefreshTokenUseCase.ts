import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { inject, injectable } from "tsyringe";
import { sign, verify } from "jsonwebtoken";
import auth from "@config/auth";
import { AppError } from "@shared/errors/AppError";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";

interface IPayLoad {
  sub: string;
  email: string;
}

interface ITokenResponse {
  refresh_token: string;
  token: string;
}

@injectable()
export class RefreshTokenUseCase {
  private usersTokensRepository: IUsersTokensRepository;
  private dateProvider: IDateProvider;

  constructor(
    @inject("UsersTokensRepository") usersTokensRepo: IUsersTokensRepository,
    @inject("DateProvider") dateProvider: IDateProvider
  ) {
    this.dateProvider = dateProvider;
    this.usersTokensRepository = usersTokensRepo;
  }

  async execute(refresh_token: string): Promise<ITokenResponse> {
    const { email, sub: user_id } = verify(
      refresh_token,
      auth.secret_refresh_token
    ) as IPayLoad;

    const userToken =
      await this.usersTokensRepository.findByUserIdAndRefreshToken(
        user_id,
        refresh_token
      );

    if (!userToken) {
      throw new AppError("Refresh Token does not exists");
    }

    await this.usersTokensRepository.deleteById(userToken.id);

    const newRefresh_Token = sign({ email }, auth.secret_refresh_token, {
      subject: user_id,
      expiresIn: auth.expires_in_refresh_token,
    });

    await this.usersTokensRepository.create({
      expires_date: this.dateProvider.addDays(auth.expires_refresh_token_days),
      user_id: user_id,
      refresh_token: newRefresh_Token,
    });

    const newTokenUser = sign({}, auth.secret_token, {
      subject: user_id,
      expiresIn: auth.expires_in_token,
    });

    return { refresh_token, token: newTokenUser };
  }
}
