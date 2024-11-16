import { Body, Controller, DefaultValuePipe, Delete, Get, HttpCode, HttpStatus, NotFoundException, Param, ParseIntPipe, Post, Query, UseGuards, ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/auth/auth.jwtAuth.guard';
import { DBService } from 'src/services/main/main.database.service';
import { User } from 'src/entities/user.entity';
import { Address } from 'src/entities/address.entity';
import { UserRepository } from 'src/entities/user.repository';
import { AddressRepository } from 'src/entities/address.repository';
import { AddressDTO } from 'src/dtos/address/address.dto';

@Controller('address')
export class AddressController {

  private readonly userRepo: UserRepository;
  private readonly addressRepo: AddressRepository;
  constructor(private dbService: DBService){
    this.userRepo = this.dbService.em.getRepository(User);
    this.addressRepo = this.dbService.em.getRepository(Address);
  }

  @Post('add')
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAuthGuard)
  async postAddAddress(@Body(ValidationPipe) addressDTO: AddressDTO) {
    const foundUser = await this.userRepo.findOne(addressDTO.ownerId);
    if(!foundUser){
      throw new NotFoundException('OwnerId could not be found!');
    }
    await this.addressRepo.createAddressFromDTO(foundUser, addressDTO);
    await this.dbService.em.flush();
  }

  @Delete('remove/:id')
  @HttpCode(HttpStatus.ACCEPTED)
  @UseGuards(JwtAuthGuard)
  async deleteRemoveAddress(@Param('id', ParseIntPipe) id: number) { //TODO - @Param('id', AddressByIdPipe) address: addressEntity
    const foundAddress = await this.addressRepo.findOne(id);
    if(!foundAddress){
      throw NotFoundException;
    }
    await this.dbService.em.removeAndFlush(foundAddress);
  }

  @Get('list')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  async getListAddresses(@Query('limit', new DefaultValuePipe(-1), new ParseIntPipe({ optional: true })) limit?: number) {
    const queried = limit === -1 ? await this.addressRepo.findAll() : await this.addressRepo.findAll({ limit: limit });
    return queried.map((address) => { return AddressDTO.from(address);});
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  async getAddress(@Param('id', ParseIntPipe) id: number) { //TODO - @Param('id', AddressByIdPipe) address: addressEntity
    const foundAddress = await this.addressRepo.findOne(id);
    if(!foundAddress){
      throw new NotFoundException('Address could not be found!');
    }
    return AddressDTO.from(foundAddress);
  }

}
