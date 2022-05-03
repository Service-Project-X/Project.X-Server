import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entity/user.entity';
import { UserRepository } from 'src/user/entity/user.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const foundUser = await this.userRepository.findOne({ email: email });
    if (await bcrypt.compare(password, foundUser.password)) {
      const { password, ...result } = foundUser;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
