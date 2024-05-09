import * as bcrypt from "bcrypt";

import { AuthResponse } from "./types/auth-response";
import { SignupInput } from "./dto/input/signup.input";
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { UsersService } from "src/users/users.service";
import { LoginInput } from "./dto/input";
import { JwtService } from "@nestjs/jwt";
import { User } from "src/users/entities/user.entity";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  private getJwtToken(userId: string) {
    return this.jwtService.sign({ id: userId });
  }

  async signup(signupInput: SignupInput): Promise<AuthResponse> {
    const user = await this.userService.create(signupInput);

    const token = this.getJwtToken(user.id);

    return { token, user };
  }

  async login(loginInput: LoginInput): Promise<AuthResponse> {
    const { email, password } = loginInput;
    const user = await this.userService.findOneByEmail(email);

    if (!bcrypt.compareSync(password, user.passwd)) {
      throw new BadRequestException("Email/Password incorrectly");
    }

    const token = this.getJwtToken(user.id);

    return { token, user };
  }

  async validateUser(id: string): Promise<User> {
    const user = await this.userService.findOneById(id);
    if (!user.isActive)
      throw new UnauthorizedException(`User is inactive, talk with an admin`);

    delete user.passwd;

    return user;
  }

  revalidateToken(user: User): AuthResponse {
    const token = this.getJwtToken(user.id);
    return { token, user };
  }
}
