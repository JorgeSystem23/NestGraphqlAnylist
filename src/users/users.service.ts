import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
  Logger,
} from "@nestjs/common";
import * as bcrypt from "bcrypt";

import { User } from "./entities/user.entity";
import { SignupInput } from "src/auth/dto/input/signup.input";

import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class UsersService {
  private logger: Logger = new Logger("UserService");

  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>
  ) {}

  async create(signupInput: SignupInput): Promise<User> {
    try {
      const newUser = this.usersRepository.create({
        ...signupInput,
        passwd: bcrypt.hashSync(signupInput.password, 10),
      });
      return await this.usersRepository.save(newUser);
    } catch (error) {
      this.handleDBErrors(error);

      /* console.log(error);
      throw new BadRequestException("Algo salio mal"); */
    }
  }

  async findAll(): Promise<User[]> {
    return [];
  }

  findOne(id: string): Promise<User> {
    throw new Error("Method not implemented.");
  }

  /*   update(id: number, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`;
  } */

  block(id: string): Promise<User> {
    throw new Error("Block method not implemented.");
  }

  private handleDBErrors(error: any): never {
    if (error.code === "23505") {
      throw new BadRequestException(error.detail.replace("Key ", ""));
    }

    this.logger.error(error);

    throw new InternalServerErrorException("Please check server logs");
  }
}
