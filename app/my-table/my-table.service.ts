import { Injectable } from '@angular/core';
import { Product } from "./Product";
import { asEnumerable } from 'linq-es2015';


@Injectable()
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

    readonly allCategories: string = "All Products";
    private isFilterCategoryEnabled: boolean = false;
    private currentSelectedCategory: string;
    private countRequestedProduct: number;

    GetProducts(count = this.products.length): Product[]
     {
         let productsItems: Product[] = [];

        if(this.isFilterCategoryEnabled)
        {
             productsItems = asEnumerable(this.products)
        .Where(p => p.category == this.currentSelectedCategory)
        .ToArray().slice(0, count)
        }
        else{
            productsItems = this.products.slice(0, count)
        }

        this.countRequestedProduct = productsItems.length;

        return productsItems;
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