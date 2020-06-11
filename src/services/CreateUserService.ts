import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import User from '../models/User';

interface Request {
  name: string;
  password: string;
  email: string;
} //criando a interface dos tipos que iremos receber no Request

class CreateUserService {
  public async execute({ name, password, email }: Request): Promise<User> {
    //criando a função create
    const userRepository = getRepository(User);

    const checkUserExists = await userRepository.findOne({
      where: {
        email,
      },
    });

    if (checkUserExists) throw new Error('Email address already used.'); //se o usuario existir no banco de dados retorna um erro

    const passwordHashed = await hash(password, 8);

    const user = userRepository.create({
      name,
      password: passwordHashed,
      email,
    });

    await userRepository.save(user);

    return user;
  }
}

export default CreateUserService;
