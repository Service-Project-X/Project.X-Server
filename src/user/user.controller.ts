import { Body, Controller, Post } from '@nestjs/common';
import { ResponseDTO } from '../global/responseDTO/response.dto';
import { CreateUserDto } from './dto/create_user.dto';
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
