import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { CreateItemInput } from "./dto/inputs/create-item.input";
import { UpdateItemInput } from "./dto/inputs/update-item.input";
import { Item } from "./entities/item.entity";

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private readonly itemsRepository: Repository<Item>
  ) {}

  async create(createItemInput: CreateItemInput): Promise<Item> {
    const newItem = this.itemsRepository.create(createItemInput);
    return await this.itemsRepository.save(newItem);
  }

  async findAll(): Promise<Item[]> {
    return this.itemsRepository.find();
  }

  async findOne(id: string): Promise<Item> {
    const item = await this.itemsRepository.findOneBy({ id });

    if (!item) throw new NotFoundException(`Item with id ${id} not found`);

    return item;
  }

  async update(id: string, updateItemInput: UpdateItemInput): Promise<Item> {
    const item = await this.findOne(id);

    if (!item) throw new NotFoundException(`Item with id ${id} not found`);

    Object.assign(item, updateItemInput);

    return this.itemsRepository.save(item);
  }

  async remove(id: string): Promise<Item> {
    const item = await this.findOne(id);

    await this.itemsRepository.remove(item);

    return { ...item, id };
  }
}
