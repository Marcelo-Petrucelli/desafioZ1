import { StaticImplements, BaseStaticDTO } from './base.dto';
import { IsNumber, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ProductDTO } from './product.dto';
import { Cart } from 'src/entities/cart.entity';

@StaticImplements<BaseStaticDTO>()
export class CartDTO {

  @IsNumber()
  @IsOptional()
  id!: number;

  @IsNumber()
  discount!: number;

  @IsOptional()
  @IsNumber({}, { each:true }) //Creation case, only list of IDs
  productIds!: number[];

  @IsOptional()
  @ValidateNested({ each: true }) //Listing case, we return the whole ProductDTO
  @Type(() => ProductDTO)
  products!: ProductDTO[];

  @IsNumber()
  ownerId!: number;

  public static from(cart: any) : CartDTO {
    const theCart = cart as Cart;

    const ret = new CartDTO();
    ret.id = theCart.id;
    ret.discount = theCart.discount;
    ret.products = theCart.cartItem.map((item) => { return ProductDTO.from(item.product); });
    ret.ownerId = theCart.owner.id;

    return ret;
  }
  
}