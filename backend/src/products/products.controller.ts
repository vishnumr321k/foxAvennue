import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  Post,
  Put,
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

  @UseGuards(JwtAuthGuard)
  @Put('product-update/:id')
  async productUpdate(
    @Param('id') id: string,
    @Body() body: any,
    @Req() req: any,
  ) {
    if (req.user.role !== 'admin') {
      throw new ForbiddenException('Admin can only Change product Data...😎');
    }

    return this.productsService.productUpdate(id, body);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('product-delete/:id')
  async deleteProduct(@Param('id') id: string, @Req() req: any) {
    if (req.user.role !== 'admin') {
      throw new ForbiddenException(
        'Admin can only permition to delete the product...😏',
      );
    }

    return this.productsService.productDelete(id);
  }
}
