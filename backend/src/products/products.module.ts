import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Product, ProductSchema } from "./products.schema";
import { ProductsController } from "./products.controller";
import { productsService } from "./products.service";

@Module({
imports:[MongooseModule.forFeature([{name: Product.name, schema: ProductSchema}])],
controllers:[ProductsController],
providers:[productsService]
})

export class ProductsModule {}