import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";

export type CartDocument = Cart & Document;

@Schema({timestamps: true})
export class Cart{
    @Prop({
        type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true
    })
    userId: string;

    @Prop([
        {
            productId:{type: mongoose.Schema.Types.ObjectId, ref: 'Product', require: true},
            quantity: {type: Number, default: 1},
            size: {type: String}
        }
    ])
    items:{
        productId: string;
        quantity: number;
        size?: string;
    }[];
}


export const CartSchema = SchemaFactory.createForClass(Cart);