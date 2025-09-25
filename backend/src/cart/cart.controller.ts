import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @UseGuards(JwtAuthGuard)
  @Post('add')
  async addToCart(
    @Request() req,
    @Body()
    body: {
      productId: string;
      quantity?: number;
      size?: string;
    },
  ) {

    console.log(req.user.userId);
    return this.cartService.addToCart(
      req.user.userId,
      body.productId,
      body.quantity ?? 1,
      body.size,
    );

    
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getCart(@Request() req) {
    return this.cartService.getCart(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('remove/:productId')
  async removeFromCart(@Request() req, @Param('productId') productId: string) {
    return this.cartService.removeCartProduct(req.user.userId, productId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('clear')
  async clearCart(@Request() req) {
    return this.cartService.clearCart(req.user.userId);
  }
}
