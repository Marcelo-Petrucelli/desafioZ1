import { StaticImplements, BaseStaticDTO } from './base.dto';
import { IsAlpha, IsNumber, IsNumberString, IsOptional, IsString, MinLength } from 'class-validator';
import { Address } from 'src/entities/address.entity';

@StaticImplements<BaseStaticDTO>()
export class AddressDTO {

  @IsNumber()
  @IsOptional()
  id!: number;

  @IsNumberString()
  @MinLength(8, { message: 'cep must have 8 digits' })
  cep!: string;

  @IsAlpha()
  @IsString()
  @MinLength(2, { message: 'state must have 2 letters' })
  state!: string;

  @IsString()
  city!: string;

  @IsString()
  district!: string;

  @IsString()
  street!: string;

  @IsNumber()
  number!: number;

  @IsNumber()
  ownerId!: number;

  public static from(address: any) : AddressDTO {
      const theAddress = address as Address;

      const ret = new AddressDTO();
      ret.id = theAddress.id;
      ret.cep = theAddress.cep;
      ret.ownerId = theAddress.owner.id;
      ret.state = theAddress.state;
      ret.city = theAddress.city;
      ret.district = theAddress.district;
      ret.street = theAddress.street;
      ret.number = theAddress.number;

      return ret;
  }

}