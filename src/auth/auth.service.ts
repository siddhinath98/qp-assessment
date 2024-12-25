import { Injectable } from '@nestjs/common';
import { AuthPayloadDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/services/user.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async validateUser({ username, password }: AuthPayloadDto) {
    const user = await this.userService.findByUsername(username);
    if (!user) return null;

    if (password === user.password) {
      const result = { ...user };
      delete result.password;
      return this.jwtService.sign(result);
    }
    return null;
  }
}
