import { StaticImplements, BaseStaticDTO } from '../../dtos/base.dto';
import { Cart } from '../../entities/cart.entity';
import { IsNumber, IsOptional } from 'class-validator';

@StaticImplements<BaseStaticDTO>()
export class CreateCartDTO {

  @IsNumber()
  @IsOptional()
  id!: number;

  @IsNumber()
  discount!: number;

  @IsOptional()
  @IsNumber({}, { each:true })
  productIds!: number[];

  @IsNumber()
  ownerId!: number;

  public static from(cart: any) : CreateCartDTO {
    const theCart = cart as Cart;

    const ret = new CreateCartDTO();
    ret.id = theCart.id;
    ret.discount = theCart.discount;
    ret.productIds = theCart.cartItems.map((cartItem) => { return cartItem.product.id; });
    ret.ownerId = theCart.owner.id;

    return ret;
  }
  
}