import { Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';

import { CreateItemInput } from "./dto/inputs/create-item.input";
import { UpdateItemInput } from "./dto/inputs/update-item.input";
import { Item } from "./entities/item.entity";
import { Repository } from "typeorm";

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository( Item )
    private readonly itemsRepository: Repository<Item>
  ) {}

  async create(createItemInput: CreateItemInput): Promise<Item> {
    const newItem = this.itemsRepository.create(createItemInput);
    return await this.itemsRepository.save(newItem);
  }

  findAll() {
    return [];
  }

  findOne(id: number) {
    return `This action returns a #${id} item`;
  }

  update(id: number, updateItemInput: UpdateItemInput) {
    return `This action updates a #${id} item`;
  }

  remove(id: number) {
    return `This action removes a #${id} item`;
  }
}
