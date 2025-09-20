import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { productsService } from './products.service';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: productsService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async creat(@Req() req, @Body() body: any) {
    if (req.user.role !== 'admin') {
      return { message: 'Unsauthorized only admin can add products...' };
    }
    return this.productsService.create(body);
  }

  @Get('all-products')
  async findAllProducts() {
    return this.productsService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.productsService.findById(id);
  }
}
