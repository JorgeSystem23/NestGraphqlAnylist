import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";

import { AuthService } from "./auth.service";
import { AuthResponse } from "./types/auth-response";
import { SignupInput, LoginInput } from "./dto/input";
import { JwtAuthGuard } from "./guards/jwt-auth.guard";
import { CurrentUser } from "./decorators/user.decorator";
import { User } from "../users/entities/user.entity";

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthResponse, { name: "signup" })
  async signup(
    @Args("signupInput") signupInput: SignupInput
  ): Promise<AuthResponse> {
    return this.authService.signup(signupInput);
  }

  @Mutation(() => AuthResponse, { name: "login" })
  async login(
    @Args("loginInput") loginInput: LoginInput
  ): Promise<AuthResponse> {
    return this.authService.login(loginInput);
  }

  @Query(() => AuthResponse, { name: "revalite" })
  @UseGuards(JwtAuthGuard)
  revaliteToken(
    @CurrentUser(/** ValidRoles.admin */) user: User
  ): AuthResponse {
    return this.authService.revalidateToken(user);
  }
}
