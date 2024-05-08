import * as bcrypt from "bcrypt";

import { AuthResponse } from "./types/auth-response";
import { SignupInput } from "./dto/input/signup.input";
import { BadRequestException, Injectable } from "@nestjs/common";
import { UsersService } from "src/users/users.service";
import { LoginInput } from "./dto/input";
import { JwtService } from "@nestjs/jwt";

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
}
