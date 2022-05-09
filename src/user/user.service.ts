import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create_user.dto';
import { User } from './entity/user.entity';
import * as bcrypt from 'bcrypt';
import { UserRepository } from './entity/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findOne(userId: number): Promise<User> {
    try {
      return await this.userRepository.findOne(userId);
    } catch (error) {
      if (error == undefined) {
        throw new Error("Can't find user");
      } else {
        throw new Error(error.message);
      }
    }
  }

  async findByEmail(userEmail: string): Promise<User> {
    return await this.userRepository.findOne({ email: userEmail });
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

    const createdUser = await this.userRepository.save(new User(user));

    return createdUser.email;
  }
}
