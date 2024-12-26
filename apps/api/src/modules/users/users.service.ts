import { Injectable, Logger } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from '@repo/types';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);
  create(createUserDto: CreateUserDto) {
    const { email, password } = createUserDto;

    this.logger.log(
      'Creating user with email: ' + email + ' & password: ' + password,
    );
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    const { email, password } = updateUserDto;

    this.logger.log(
      `This action returns a #${email} & password #${password} user by id #${id}`,
    );
  }
}
