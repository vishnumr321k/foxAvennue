import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cart, CartDocument } from './cart.schema';

@Injectable()
export class CartService {
  constructor(@InjectModel(Cart.name) private cartModel: Model<CartDocument>) {}

  async addToCart(
    userId: string,
    productId: string,
    quantity: number,
    size?: string,
  ) {
    let cart = await this.cartModel.findOne({ userId });

    if (!cart) {
      cart = new this.cartModel({ userId, items: [] });
    }

    const existintItem = cart.items.find(
      (item) => item.productId.toString() === productId && item.size === size,
    );

    if (existintItem) {
      existintItem.quantity += quantity;
    } else {
      cart.items.push({ productId, quantity, size });
    }

    return cart.save();
  }

  async getCart(userId: string) {
    const cart = await this.cartModel
      .findOne({ userId })
      .populate('items.productId', 'name price sizes images');

    if (!cart) {
      return { userId, items: [] };
    }

    return cart;
  }

  async removeCartProduct(userId: string, productId: string){
    const cart = await this.cartModel.findOne({userId});

    if(!cart){
        throw new NotFoundException('Cart not fount');
    }

    cart.items = cart.items.filter(
        (item) => item.productId === productId
    );

    return cart.save();
  }


  async clearCart(userId: string){
    const cart = await this.cartModel.findOne({userId})

    if(!cart){
        throw new NotFoundException('Cart Not Found in this user');
    }

    cart.items = [];

    return cart.save();
  }
}
