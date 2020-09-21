import fs from 'fs';
import path from 'path';
import AppError from '@shared/errors/AppError';

import uploadConfig from '@config/upload';
import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  user_id: string;
  avatarFilename: string;
}

class UpdateUserAvatarService {
  constructor(private usersRepository: IUsersRepository) {}

  public async execute({ user_id, avatarFilename }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('Only authenticated users can change avatar.', 401);
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar); // juntando o arquivo pelo outro
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath); // verifica se o avatar já existe com o fs.

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath); // deslinkando o avatar existente com o usuário
      }
    }

    user.avatar = avatarFilename;

    await this.usersRepository.save(user); // atualizando as mudanças que a gente fez
    return user;
  }
}

export default UpdateUserAvatarService;