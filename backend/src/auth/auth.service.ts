import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UserService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async register(name: string, email: string, password: string) {
    if (!name || !email || !password) {
      throw new NotFoundException(
        'The name, email and password is not get the regisert service...🥲',
      );
    }

    const existOrNot = await this.userService.findByEmail(email);
    if (existOrNot) {
      throw new UnauthorizedException('User is already register...😶‍🌫️');
    }

    const hashPassword = await bcrypt.hash(password, 10);
    return this.userService.create({ name, email, password: hashPassword });
  }

  async login(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('The user is not fount...🥲');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException(
        'The User is enter invalide Credentials...🫡',
      );
    }

    const payload = { sub: user._id, email: user.email, role: user.role };

    return {
      token: this.jwtService.sign(payload),
    };
  }
}
