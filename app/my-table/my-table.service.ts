import { Product } from "./Product";
import { asEnumerable } from 'linq-es2015';

export class MyTableService {

    private readonly products: Product[] =
    [{ id: 1, name: "product 1", price: 100, category: "Category 1" },
    { id: 2, name: "product 2", price: 200, category: "Category 2" },
    { id: 3, name: "product 3", price: 300, category: "Category 2" },
    { id: 4, name: "product 4", price: 400, category: "Category 3" },
    { id: 5, name: "product 5", price: 500, category: "Category 1" },
    { id: 6, name: "product 6", price: 600, category: "Category 1" },
    { id: 7, name: "product 7", price: 700, category: "Category 2" },
    { id: 8, name: "product 8", price: 800, category: "Category 3" },
    { id: 9, name: "product 9", price: 900, category: "Category 3" },
    { id: 10, name: "product 10", price: 1000, category: "Category 3" }];

    GetProducts(count = this.products.length): Product[] {
        return this.products.slice(0, count);
    }

    getUniqueProductCategories(): string[]
    {
         return asEnumerable(this.products).Select(p => p.category).Distinct().ToArray();
    }

     getUniqueProductsByCategory(category: string): Product[]
    {
         return asEnumerable(this.products).Where(p => p.category == category).ToArray();
    }

    deleteById(id: number): void
    {
        for(let i: number = 0; i < this.products.length; i++)
        {
            if(this.products[i].id === id)
            {
                this.products.splice(i, 1);
                break;
            }
        }
    }

    get CountAllProducts() : number
    {
        return this.products.length;
    }
}