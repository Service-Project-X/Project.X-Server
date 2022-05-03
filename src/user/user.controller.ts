import { Body, Controller, Post } from '@nestjs/common';
import { ResponseDTO } from 'src/global/responseDTO/response.dto';
import { CreateUserDto } from './dto/create_user.dto';
import { User } from './entity/user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() userData: CreateUserDto): Promise<ResponseDTO<string>> {
    const userEmail: string = await this.userService.create(userData);
    return new ResponseDTO<string>({ message: 'success', data: userEmail });
  }
}
