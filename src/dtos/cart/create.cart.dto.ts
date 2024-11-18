import { StaticImplements, BaseStaticDTO } from 'src/dtos/base.dto';
import { IsNumber, IsOptional } from 'class-validator';
import { Cart } from 'src/entities/cart.entity';

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