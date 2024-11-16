import { StaticImplements, BaseStaticDTO } from 'src/dtos/base.dto';
import { IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { GetCartDTO } from 'src/dtos/cart/get.cart.dto';
import { AddressDTO } from 'src/dtos/address/address.dto';

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
  @Type(() => AddressDTO)
  addresses?: AddressDTO[];

  @IsOptional()
  @ValidateNested()
  @Type(() => GetCartDTO)
  cart?: GetCartDTO;

  public static from(product: any) : UserDTO {
      return new UserDTO();
  }

}