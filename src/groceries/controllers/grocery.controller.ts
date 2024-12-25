import {
  Controller,
  Post,
  Get,
  Delete,
  Put,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { GroceryService } from '../services/grocery.service';
import { Grocery } from '../entities/grocery.entity';
import { PlaceOrderDto } from '../dto/place-order.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from 'src/auth/enums/roles.enum';
import { Roles } from 'src/auth/decorators/roles.decorators';
import { UpdateGroceryDto } from '../dto/update-grocery.dto';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('groceries')
export class GroceryController {
  constructor(private readonly groceryService: GroceryService) {}

  @Roles(Role.admin)
  @Post()
  async addGrocery(@Body() grocery: Grocery): Promise<Grocery> {
    return this.groceryService.addGrocery(grocery);
  }

  @Roles(Role.admin, Role.user)
  @Get('all')
  async viewAllGroceries(): Promise<Grocery[]> {
    return this.groceryService.viewAllGroceries();
  }

  @Roles(Role.admin)
  @Delete(':id')
  async removeGrocery(@Param('id') id: number): Promise<void> {
    return this.groceryService.removeGrocery(id);
  }

  @Roles(Role.admin)
  @Put(':id')
  async updateGrocery(
    @Param('id') id: number,
    @Body() updatedGrocery: UpdateGroceryDto,
  ): Promise<Grocery> {
    return this.groceryService.updateGrocery(id, updatedGrocery);
  }

  @Roles(Role.admin)
  @Put(':id/inventory')
  async updateInventory(
    @Param('id') id: number,
    @Body('inventory') inventory: number,
  ): Promise<Grocery> {
    return this.groceryService.updateInventory(id, inventory);
  }

  @Roles(Role.user)
  @Post('order')
  async placeOrder(@Body() order: PlaceOrderDto): Promise<void> {
    await this.groceryService.placeOrder(order);
  }
}
