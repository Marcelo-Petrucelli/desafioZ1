import { StaticImplements, BaseStaticDTO } from '../../dtos/base.dto';
import { Cart } from '../../entities/cart.entity';
import { IsNumber, IsOptional } from 'class-validator';

@StaticImplements<BaseStaticDTO>()
export class AlterCartDTO {

  @IsNumber()
  @IsOptional()
  id!: number;

  @IsNumber()
  @IsOptional()
  discount!: number;

  @IsNumber({}, { each:true })
  productIds!: number[];

  public static from(cart: any) : AlterCartDTO {
    const theCart = cart as Cart;

    const ret = new AlterCartDTO();
    ret.id = theCart.id;
    ret.discount = theCart.discount;
    ret.productIds = theCart.cartItems.map((cartItem) => { return cartItem.product.id; });

    return ret;
  }
  
}