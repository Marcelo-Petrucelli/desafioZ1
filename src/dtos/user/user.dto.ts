import { StaticImplements, BaseStaticDTO } from '../../dtos/base.dto';
import { GetCartDTO } from '../../dtos/cart/get.cart.dto';
import { GetAddressDTO } from '../../dtos/address/get.address.dto';
import { IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

@StaticImplements<BaseStaticDTO>()
export class UserDTO {

  @IsNumber()
  @IsOptional()
  id!: number;

  @IsOptional()
  @IsString()
  fullName!: string;

  @IsOptional()
  @IsString()
  email!: string;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => GetAddressDTO)
  addresses?: GetAddressDTO[];

  @IsOptional()
  @ValidateNested()
  @Type(() => GetCartDTO)
  cart?: GetCartDTO;

  public static from(product: any) : UserDTO {
      return new UserDTO();
  }

}