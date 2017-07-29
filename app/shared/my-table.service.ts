import { Injectable, OnInit } from '@angular/core';
import { Product } from "./Product";
import { asEnumerable } from 'linq-es2015';

let data     = {
getData: () => {
// вернуть массив products
            return [{ id: 1, name: "product 1", price: 100, category: "Category 1" },
    { id: 2, name: "product 2", price: 200, category: "Category 2" },
    { id: 3, name: "product 3", price: 300, category: "Category 2" },
    { id: 4, name: "product 4", price: 400, category: "Category 3" },
    { id: 5, name: "product 5", price: 500, category: "Category 1" },
    { id: 6, name: "product 6", price: 600, category: "Category 1" },
    { id: 7, name: "product 7", price: 700, category: "Category 2" },
    { id: 8, name: "product 8", price: 800, category: "Category 3" },
    { id: 9, name: "product 9", price: 900, category: "Category 3" },
    { id: 10, name: "product 10", price: 1000, category: "Category 3" }];
        }
}

@Injectable()
export class MyTableService {

constructor()
{
    this.products = data.getData();
}

    private  products: Product[];

    readonly allCategories: string = "All Products";
    private isFilterCategoryEnabled: boolean = false;
    private currentSelectedCategory: string;
    private countRequestedProduct: number;
    private productsItems: Product[] = [];

    GetProducts(count = this.products.length): Product[]
     {
        if(this.isFilterCategoryEnabled)
        {
              this.productsItems = asEnumerable(this.products)
        .Where(p => p.category == this.currentSelectedCategory)
        .ToArray().slice(0, count)
        }
        else{
             this.productsItems = this.products.slice(0, count)
        }

        this.countRequestedProduct =  this.productsItems.length;

        return this.productsItems;
    }

    getUniqueProductCategories(): string[]
    {
        let categories: string[] = asEnumerable(this.products).Select(p => p.category).Distinct()
         .OrderBy(p => p).ToArray();
         categories.unshift(this.allCategories)

         return categories;
    }

     setProductCategory(category: string)
    {
        this.currentSelectedCategory = category;
        this.isFilterCategoryEnabled = category !== this.allCategories;
    }

    addProduct(product: Product): void
    {
        if(product.id === undefined)
        {
            product.id = asEnumerable(this.products).Max(p => p.id) + 1;
        }
       
        this.products.push(product);
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

    get CountRequestedProduct(): number
    {
        return this.countRequestedProduct;
    }
}