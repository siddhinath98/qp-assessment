import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Grocery } from '../entities/grocery.entity';
import { PlaceOrderDto } from '../dto/place-order.dto';

@Injectable()
export class GroceryService {
  constructor(
    @InjectRepository(Grocery)
    private groceryRepository: Repository<Grocery>,
  ) {}

  async addGrocery(grocery: Grocery): Promise<Grocery> {
    try {
      return await this.groceryRepository.save(grocery);
    } catch {
      throw new InternalServerErrorException('Failed to add grocery item');
    }
  }

  async viewAllGroceries(): Promise<Grocery[]> {
    try {
      return await this.groceryRepository.find();
    } catch {
      throw new InternalServerErrorException(
        'Failed to retrieve grocery items',
      );
    }
  }

  async removeGrocery(id: number): Promise<void> {
    const result = await this.groceryRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Grocery item with ID ${id} not found`);
    }
  }

  async updateGrocery(
    id: number,
    updatedGrocery: Partial<Grocery>,
  ): Promise<Grocery> {
    const grocery = await this.groceryRepository.findOne({ where: { id } });
    if (!grocery) {
      throw new NotFoundException(`Grocery item with ID ${id} not found`);
    }
    await this.groceryRepository.update(id, updatedGrocery);
    return await this.groceryRepository.findOne({ where: { id } });
  }

  async updateInventory(id: number, inventory: number): Promise<Grocery> {
    await this.groceryRepository.update(id, { inventory });
    const grocery = await this.groceryRepository.findOne({ where: { id } });
    if (!grocery) {
      throw new NotFoundException(`Grocery item with ID ${id} not found`);
    }
    return grocery;
  }

  async placeOrder(placeOrderDto: PlaceOrderDto): Promise<void> {
    const { items } = placeOrderDto;

    for (const item of items) {
      const { groceryId, quantity } = item;
      const grocery = await this.groceryRepository.findOne({
        where: { id: groceryId },
      });
      if (!grocery) {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            message: `Grocery with ID ${groceryId} not found`,
          },
          HttpStatus.BAD_REQUEST,
        );
      }
      if (grocery.inventory < quantity || grocery.inventory === 0) {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            message: `Insufficient inventory for grocery ID ${groceryId}`,
          },
          HttpStatus.BAD_REQUEST,
        );
      }
      grocery.inventory -= quantity;
      await this.groceryRepository.update(grocery.id, grocery);
    }
  }
}
