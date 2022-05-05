import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create_user.dto';
import { User } from './entity/user.entity';
import * as bcrypt from 'bcrypt';
import { UserRepository } from './entity/user.repository';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: UserRepository,
  ) {}

  async create(userData: CreateUserDto): Promise<string> {
    const { email, name, password } = userData;

    const user = new User({
      id: null,
      email: email,
      name: name,
      password: await bcrypt.hash(password, 10),
      userTeams: [],
    });

    const createdUser = await this.userRepository.save(user);

    return createdUser.email;
  }

  async findOne(id?: number, email?: string): Promise<User> {
    return typeof id === 'number'
      ? await this.userRepository.findOne(id)
      : await this.userRepository.findOne({ email });
  }

  async save(partial: Partial<User>): Promise<User> {
    const createUser = new User({
      id: partial['id'],
      name: partial['name'],
      email: partial['email'],
      password: partial['password'],
      userTeams: partial['userTeams'],
    });

    return await this.userRepository.save(createUser);
  }
}
