import { inject, injectable } from "tsyringe";


import { IUsersRepository } from "../../repositories/IUsersRepository";
import { IStorageProvider } from "@shared/container/providers/StorageProvider/IStorageProvider";

interface IRequest {
  user_id: string;
  avatarFile: string;
}

@injectable()
export class UpdateAvatarUseCase {
  private userRepository: IUsersRepository;

  constructor(
    @inject("UsersRepository") userRepository: IUsersRepository,
    @inject("StorageProvider")
    private storageProvider: IStorageProvider
  ) {
    this.userRepository = userRepository;
  }

  async execute({ user_id, avatarFile }: IRequest): Promise<void> {
    const user = await this.userRepository.findById(user_id);

    if (user.avatar) {
      await this.storageProvider.delete(user.avatar, "avatar");
    }

    await this.storageProvider.save(avatarFile, "avatar");

    user.avatar = avatarFile;

    await this.userRepository.create(user);
  }
}
