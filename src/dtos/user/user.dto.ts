import { StaticImplements, BaseStaticDTO } from 'src/dtos/base.dto';
import { IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { GetCartDTO } from 'src/dtos/cart/get.cart.dto';
import { GetAddressDTO } from 'src/dtos/address/get.address.dto';

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