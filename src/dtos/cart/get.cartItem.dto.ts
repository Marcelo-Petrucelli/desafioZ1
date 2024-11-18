import { StaticImplements, BaseStaticDTO } from '../../dtos/base.dto';
import { GetProductDTO } from '../../dtos/product/get.product.dto';
import { CartItem } from '../../entities/cartItem.entity';
import { IsNumber, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

@StaticImplements<BaseStaticDTO>()
export class GetCartItemDTO {

  @IsNumber()
  @IsOptional()
  id!: number;

  @ValidateNested()
  @Type(() => GetProductDTO)
  product!: GetProductDTO;

  @IsNumber()
  quantity!: number;

  public static from(cart: any) : GetCartItemDTO {
    const theCartItem = cart as CartItem;

    const ret = new GetCartItemDTO();
    ret.id = theCartItem.id;
    ret.product = GetProductDTO.from(theCartItem.product);
    ret.quantity = theCartItem.quantity;

    return ret;
  }
  
}