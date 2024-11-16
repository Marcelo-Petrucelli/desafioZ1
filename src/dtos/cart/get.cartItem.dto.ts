import { StaticImplements, BaseStaticDTO } from 'src/dtos/base.dto';
import { IsNumber, IsOptional, ValidateNested } from 'class-validator';
import { GetProductDTO } from 'src/dtos/product/get.product.dto';
import { CartItem } from 'src/entities/cartItem.entity';
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