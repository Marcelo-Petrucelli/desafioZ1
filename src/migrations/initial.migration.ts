import { Migration } from '@mikro-orm/migrations';
import { User } from '../entities/user.entity';
import { Address } from '../entities/address.entity';
import { Product } from '../entities/product.entity';

import * as bcrypt from 'bcrypt';

export class InitialMigration extends Migration {

  async up(): Promise<void> {
    const em = this.getEntityManager();

    //#region Users 
    const users: User[] = [];
    users.push(em.create(User, {email: 'teste@teste.com.br', password: bcrypt.hashSync('teste', 10), fullName: 'Mr. Teste'}));
    users.push(em.create(User, {email: 'teste2@teste.com.br', password: bcrypt.hashSync('teste2', 10), fullName: 'Mrs. Teste'}));
    users.push(em.create(User, {email: 'teste3@teste.com.br', password: bcrypt.hashSync('teste3', 10), fullName: 'Lord Teste'}));
    users.push(em.create(User, {email: 'teste4@teste.com.br', password: bcrypt.hashSync('teste4', 10), fullName: 'GOD Teste'}));
    users.forEach((user) => {
        em.persist(user);
    });
    //#endregion

    //#region Addresses 
    const addresses: Address[] = [];
    addresses.push(em.create(Address, { cep: '13560001', state: 'SP', city: 'São Carlos', number: 10, district: 'Centro', street: 'Avenida São Carlos', owner: users[0] }));
    addresses.push(em.create(Address, { cep: '01307001', state: 'SP', city: 'São Paulo', number: 569, district: 'Consolação', street: 'Rua Frei Caneca', owner: users[1] }));
    addresses.push(em.create(Address, { cep: '20531590', state: 'RJ', city: 'Rio de Janeiro', number: 99, district: 'Alto da Boa Vista', street: 'Estrada da Cascatinha', owner: users[2] }));
    addresses.push(em.create(Address, { cep: '85859899', state: 'PR', city: 'Foz do Iguaçu', number: 11656, district: 'Parque Nacional do Iguaçu', street: 'Rodovia BR-469', owner: users[3] }));
    addresses.forEach((address) => {
        em.persist(address);
    });
    //#endregion

    //#region Product 
    const products: Product[] = [];
    products.push(em.create(Product, { name: 'Produto1', description: 'Descrição do Produto 1', stock: 10, weight: 10.2, buyingPrice: 10.5, sellingPrice: 21}));
    products.push(em.create(Product, { name: 'Produto2', description: 'Descrição do Produto 2', stock: 20, weight: 1.6, buyingPrice: 5.5, sellingPrice: 5.8}));
    products.push(em.create(Product, { name: 'Produto3', description: 'Descrição do Produto 3', stock: 15, weight: 3.2, buyingPrice: 2.5, sellingPrice: 20.3}));
    products.push(em.create(Product, { name: 'Produto4', description: 'Descrição do Produto 4', stock: 0, weight: 7.5, buyingPrice: .5, sellingPrice: .2}));
    products.forEach((product) => {
        em.persist(product);
    });
    //#endregion

    await em.flush();
  }

  async down(){
    //TODO - Não necessário no momento. Para efeito de testes, Refresh no esquema irá recriar as tabelas das entidades e limpar as tabelas.
  }
}