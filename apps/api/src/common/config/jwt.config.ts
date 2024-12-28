import { registerAs } from '@nestjs/config';
import { MAX_AGE } from '@repo/utility';

export default registerAs('jwt', () => ({
  secret: process.env.JWT_SECRET,
  expiresIn: MAX_AGE,
}));
