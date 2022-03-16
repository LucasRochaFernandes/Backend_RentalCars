import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { EtherealMailProviderInMemory } from "@shared/container/providers/MailProvider/implementations/In-Memory/EtherealMailProviderInMemory";
import { AppError } from "@shared/errors/AppError";
import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase";

let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let mailProvider: EtherealMailProviderInMemory;
let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let dateProvider: DayjsDateProvider;

describe("Send Forgot Password Mail Use Case", () => {
  beforeEach(() => {
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    mailProvider = new EtherealMailProviderInMemory();
    dateProvider = new DayjsDateProvider();
    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider,
      mailProvider
    );
  });

  it("should be able to send a forgot password mail to user", async () => {
    const sendEmail = jest.spyOn(mailProvider, "sendMail");

    const user: ICreateUserDTO = {
      name: "User test",
      password: "123",
      email: "user@test.com",
      driver_license: "151546465",
    };
    await usersRepositoryInMemory.create(user);

    await sendForgotPasswordMailUseCase.execute(user.email);

    expect(sendEmail).toHaveBeenCalled();
  });
  it("should not be able to send an email if user does not exists", async () => {
    await expect(
      sendForgotPasswordMailUseCase.execute("@mail")
    ).rejects.toEqual(new AppError("User not found"));
  });

  it("should be able to create an users token", async () => {
    const created = jest.spyOn(usersTokensRepositoryInMemory, "create");

    const user: ICreateUserDTO = {
      name: "User test",
      password: "123",
      email: "user@test.com",
      driver_license: "151546465",
    };
    await usersRepositoryInMemory.create(user);

    await sendForgotPasswordMailUseCase.execute(user.email);

    expect(created).toHaveBeenCalled();
  });
});
