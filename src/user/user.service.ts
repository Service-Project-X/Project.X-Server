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

  async findOne(id?: number, email?: string): Promise<User> {
    try {
      return typeof id === 'number'
        ? await this.userRepository.findOne(id)
        : await this.userRepository.findOne({ email });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async save(partial: Partial<User>): Promise<User> {
    const createUser = new User({
      id: partial['id'],
      name: partial['name'],
      email: partial['email'],
      password: partial['password'],
      userTeams: partial['userTeams'],
    });

    try {
      return await this.userRepository.save(createUser);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async createUser(userData: CreateUserDto): Promise<string> {
    const { email, name, password } = userData;

    const user = new User({
      id: null,
      email: email,
      name: name,
      password: await bcrypt.hash(password, 10),
      userTeams: [],
    });

    const createdUser = await this.save(user);

    return createdUser.email;
  }
}
