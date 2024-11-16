import { EntityRepository } from '@mikro-orm/mysql';
import { NotAcceptableException } from '@nestjs/common';
import { Product } from 'src/entities/product.entity';
import { CreateProductDTO } from 'src/dtos/product/create.product.dto';

export class ProductRepository extends EntityRepository<Product> {
  async createProductFromDTO(createProductDTO: CreateProductDTO){
    const createdProduct = this.create({ //Send this to the Entity, as some static 'to' method
        name: createProductDTO.name,
        description: createProductDTO.description,
        weight: createProductDTO.weight,
        buyingPrice: createProductDTO.buyingPrice,
        sellingPrice: createProductDTO.sellingPrice,
        stock: createProductDTO.stock
    });

    this.em.persist(createdProduct);
  }

  async tryRemoveProduct(product: Product, force?: boolean){
    const inOrders = await product.orders.load();
    if(inOrders.length > 0){
      throw new NotAcceptableException(`The product with Id ${product.id} exists inside an Order and can't be removed.`);
    }

    const inCartsAsItem = await product.cartItems.load();
    if(inCartsAsItem.length > 0 && !force){
      throw new NotAcceptableException(`The product with Id ${product.id} exists inside ${inCartsAsItem.length} Carts and can only be removed using force=true!`);
    }

    //Not necessary, since Product has a orphanRemoval for CartItems
    /*for(const cartItem of inCartsAsItem){
      this.em.remove(cartItem);
    }*/
    this.em.remove(product);
  }
}