import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";
import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";

interface IRequest {
  token: string;
  password: string;
}

@injectable()
export class ResetPasswordUserUseCase {
  constructor(
    @inject("UsersTokensRepository")
    private userTokensRepository: IUsersTokensRepository,
    @inject("UsersRepository")
    private userRepository: IUsersRepository,
    @inject("DateProvider") private dateProvider: IDateProvider
  ) {}

  async execute({ token, password }: IRequest): Promise<void> {
    const userToken = await this.userTokensRepository.findUserByRefreshToken(
      token
    );

    if (!userToken) {
      throw new AppError("Invalid Token, user not registered");
    }

    const tokenValid= this.dateProvider.compareIfBefore(
      this.dateProvider.dateNow(),
      userToken.expires_date
    );

    if (!tokenValid) {
      throw new AppError("Token defeated");
    }

    const user = await this.userRepository.findById(userToken.user_id);

    const newPassword = await hash(password, 8);

    user.password = newPassword;

    await this.userRepository.create(user);

    await this.userTokensRepository.deleteById(userToken.id);
  }
}
