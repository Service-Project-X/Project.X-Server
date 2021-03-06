import { Injectable } from '@nestjs/common';
import { User } from '../user/entity/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { UserRepository } from '../user/entity/user.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const foundUser = await this.userRepository.findOne({ email });
    if (await bcrypt.compare(password, foundUser.password)) {
      const { password, ...result } = foundUser;
      return result;
    }
    return null;
  }

  async login(user: any): Promise<string> {
    const payload = { email: user.email, sub: user.id };
    return this.jwtService.sign(payload);
  }

  async googleLogin(req: Request): Promise<string> {
    if (!req.user) {
      return 'No user from google';
    }

    const foundUser = await this.userRepository.findOne({
      email: req.user['email'],
    });

    if (typeof foundUser === 'undefined') {
      const user: User = new User({
        name: req.user['lastName'] + req.user['firstName'],
        email: req.user['email'],
        userTeams: [],
      });

      await this.userRepository.save(user);
    }

    return req.user['accessToken'];
  }
}
