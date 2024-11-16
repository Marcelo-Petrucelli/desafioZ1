import { StaticImplements, BaseStaticDTO } from 'src/dtos/base.dto';
import { IsNumber, IsOptional, ValidateNested } from 'class-validator';
import { GetCartItemDTO } from 'src/dtos/cart/get.cartItem.dto';
import { Cart } from 'src/entities/cart.entity';
import { Type } from 'class-transformer';

@StaticImplements<BaseStaticDTO>()
export class GetCartDTO {

  @IsNumber()
  @IsOptional()
  id!: number;

  @IsNumber()
  discount!: number;

  @ValidateNested({ each: true }) //Listing case, we return the whole ProductDTO
  @Type(() => GetCartItemDTO)
  products!: GetCartItemDTO[];

  @IsNumber()
  ownerId!: number;

  public static async from(cart: any) : Promise<GetCartDTO> {
    const theCart = cart as Cart;
    
    const ret = new GetCartDTO();
    ret.id = theCart.id;
    ret.discount = theCart.discount;
    ret.products = theCart.cartItem.map((cartItem) => { return GetCartItemDTO.from(cartItem); });
    ret.ownerId = theCart.owner.id;

    return ret;
  }
  
}