import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from './products.schema';
import { Model } from 'mongoose';

@Injectable()
export class productsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  async create(data: Partial<Product>): Promise<Product> {
    const product = new this.productModel(data);

    return product.save();
  }

  async findById(id: string): Promise<Product> {
    const product = await this.productModel.findById(id).exec();
    if (!product) {
      throw new NotFoundException('Product not found...');
    }
    return product;
  }

  async findAll(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  async productUpdate(
    id: string,
    updateData: Partial<Product>,
  ): Promise<Product> {
    const product = await this.productModel.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!product) {
      throw new NotFoundException('The Product not Found...🥲');
    }

    return product;
  }

  async productDelete(id: string): Promise<void> {
    const result = await this.productModel.findByIdAndDelete(id);

    if (!result) {
      throw new ForbiddenException('The product is not in the db...🥲');
    }
  }
}
