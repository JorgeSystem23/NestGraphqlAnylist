import { AuthResponseTypes } from "./types/auth-response.types";
import { SignupInput } from "./dto/input/signup.input";
import { Injectable } from "@nestjs/common";
import { UsersService } from "src/users/users.service";

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService) {}

  async signup(signupInput: SignupInput): Promise<AuthResponseTypes> {
    const user = await this.userService.create(signupInput);

    //TODO: create JWT
    const token = "ABCD123";

    return { token, user };
  }
}
