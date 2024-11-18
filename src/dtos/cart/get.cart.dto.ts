import { StaticImplements, BaseStaticDTO } from '../../dtos/base.dto';
import { GetCartItemDTO } from '../../dtos/cart/get.cartItem.dto';
import { Cart } from '../../entities/cart.entity';
import { IsNumber, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

@StaticImplements<BaseStaticDTO>()
export class GetCartDTO {

  @IsNumber()
  @IsOptional()
  id!: number;

  @IsNumber()
  discount!: number;

  @ValidateNested({ each: true }) //Listing case, we return the whole GetProductDTO
  @Type(() => GetCartItemDTO)
  products!: GetCartItemDTO[];

  @IsNumber()
  ownerId!: number;

  public static async from(cart: any) : Promise<GetCartDTO> {
    const theCart = cart as Cart;
    
    const ret = new GetCartDTO();
    ret.id = theCart.id;
    ret.discount = theCart.discount;
    ret.products = theCart.cartItems.map((cartItem) => { return GetCartItemDTO.from(cartItem); });
    ret.ownerId = theCart.owner.id;

    return ret;
  }
  
}