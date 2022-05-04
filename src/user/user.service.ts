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

  findAll(): Promise<User[]> {
    console.log('유저 전체 불러오기');
    return this.userRepository.find();
  }

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
}
