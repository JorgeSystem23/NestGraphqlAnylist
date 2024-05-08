import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { AuthService } from "./auth.service";
import { AuthResponseTypes } from "./types/auth-response.types";
import { SignupInput } from "./dto/input/signup.input";

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthResponseTypes, { name: "signup" })
  async signup(
    @Args("signupInput") signupInput: SignupInput
  ): Promise<AuthResponseTypes> {
    return this.authService.signup(signupInput);
  }

  /*   @Mutation({ name: "login" })
  async login(): Promise<> {
    // return this.authService.login();
  }

  @Query({name: 'revalite'})
  async revaliteToken() {
    // return this.authService.revaliteToken();
  } */
}
