import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { AuthService } from "./auth.service";
import { AuthResponse } from "./types/auth-response";
import { SignupInput, LoginInput } from "./dto/input";
import { UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "./guards/jwt-auth.guard";

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
  revaliteToken(): // currentUser user:User
  AuthResponse {
    // return this.authService.revaliteToken(user);
    throw new Error("Not implemented");
  }
}
