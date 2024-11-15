import { Product } from 'src/entities/product.entity';

export class ProductDTO {
    //name: string;
    //age: number;
    //breed: string;

    public static from(product: Product) : ProductDTO | null {
        return null;
    }
}