import { Injectable, Logger } from '@nestjs/common';
import { CreateAuthDto, UpdateAuthDto } from '@repo/types';
import { formatDateTime } from '@repo/utility';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  create(createAuthDto: CreateAuthDto) {
    const { email, password } = createAuthDto;

    this.logger.log(
      `Creating user with email: ${email} & password: ${password}`,
    );
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth at ${formatDateTime(Date.now())}`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth `;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    const { email, password } = updateAuthDto;

    this.logger.log(
      `Updating user with id: ${email} & password: ${password} #${id}`,
    );
  }
}
