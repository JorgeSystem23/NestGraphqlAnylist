import { Injectable, NotFoundException } from "@nestjs/common";
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

  async findAll():Promise<Item[]> {
    return this.itemsRepository.find(); 
  }

  async findOne(id: string):Promise<Item> {
    const item = await this.itemsRepository.findOneBy({ id });

    if (!item) {
      throw new NotFoundException(`Item with id ${id} not found`);
    }

    return item;
  }

  update(id: string, updateItemInput: UpdateItemInput) {
    return `This action updates a #${id} item`;
  }

  remove(id: number) {
    return `This action removes a #${id} item`;
  }
}
