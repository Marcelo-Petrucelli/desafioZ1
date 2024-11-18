import { Body, Controller, DefaultValuePipe, Delete, Get, HttpCode, HttpStatus, NotFoundException, Param, ParseBoolPipe, ParseIntPipe, Post, Query, UseGuards, ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from '../../guards/auth/auth.jwtAuth.guard';
import { DBService } from '../../services/main/main.database.service';
import { Product } from '../../entities/product.entity';
import { ProductRepository } from '../../entities/product.repository';
import { GetProductDTO } from '../../dtos/product/get.product.dto';
import { CreateProductDTO } from '../../dtos/product/create.product.dto';

@Controller('product')
export class ProductController {

  private readonly productRepo: ProductRepository;
  constructor(private dbService: DBService){
    this.productRepo = this.dbService.em.getRepository(Product);
  }

  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAuthGuard)
  async postCreateProduct(@Body(ValidationPipe) createProductDTO: CreateProductDTO) {
    //If Id is posted, we ignore it
    await this.productRepo.createProductFromDTO(createProductDTO);
    await this.dbService.em.flush();
  }

  @Delete('remove/:id')
  @HttpCode(HttpStatus.ACCEPTED)
  @UseGuards(JwtAuthGuard)
  async deleteRemoveProduct(@Param('id', ParseIntPipe) id: number, @Query('force', new DefaultValuePipe(false), new ParseBoolPipe({ optional: true })) force?: boolean) {
    const foundProduct = await this.productRepo.findOne(id);
    if(!foundProduct){
      throw new NotFoundException(`There is no product with Id ${id}.`);
    }
    await this.productRepo.tryRemoveProduct(foundProduct, force);
    await this.dbService.em.flush();
  }

  @Get('list')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  async getListProducts(@Query('limit', new DefaultValuePipe(-1), new ParseIntPipe({ optional: true })) limit?: number) {
    const products = limit === -1 ? await this.productRepo.findAll() : await this.productRepo.findAll({ limit: limit });
    return products.map((product) => { return CreateProductDTO.from(product); });
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  async getProduct(@Param('id', ParseIntPipe) id: number) {  //TODO - @Param('id', ProductByIdPipe) product: productEntity
    const foundProduct = await this.productRepo.findOne(id);
    if(!foundProduct){
      throw new NotFoundException(`There is no product with Id ${id}.`);
    }
    return GetProductDTO.from(foundProduct);
  }

}
