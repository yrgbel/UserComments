import { Component, Output, EventEmitter, Input, OnInit } from "@angular/core";
import { MyTableService } from "../shared/my-table.service"
import { Product } from "../shared/Product";

@Component({
    moduleId : module.id,
    selector: "my-table",
    templateUrl: "my-table.component.html",
    styleUrls: ["my-table.component.css"],
    inputs: ["countRows"]
})
export class MyTableComponent implements OnInit {

    private products: Product[] = [];

        ngOnInit(): void {
             this.refreshProducts();
        }

    constructor(private myTableService: MyTableService)
    {  }
 getStyles()
  {
    let styles = {
        "background-color" : "greenyellow",
        "display" : "inline"
    };
    return styles;
  }
    @Output()
    delete : EventEmitter<number> = new EventEmitter<number>();

    // закрытое поле
    private _countRows: number = this.getAllProductCount;
    // setter для получения значения закрытого поля _countRows 
    get countRows(): number
    {
        return this._countRows;
    }
    // setter для установки значения закрытого поля _countRows 
    set countRows(value: number)
    {
        let allCountRows = this.getAllProductCount;
        this._countRows = value > allCountRows ? allCountRows : value;
    } 

    get getAllProductCount(): number
    {
        return this.myTableService.CountAllProducts;
    }
    
    private getProducts(count?: number): Array<Product>
    {
        return this.myTableService.GetProducts(count);
    }

    @Output()
    refreshProducts(count?: number): void
    {
        this.products = this.getProducts(count).slice();
        this.countRows = this.getProducts(count).length;
    }

    private deleteProduct(id: number): void
    {
        this.myTableService.deleteById(id);
        this.delete.emit(id);
        this.refreshProducts();
    }

    getCategories(): string[]
    {
        return this.myTableService.getUniqueProductCategories();
    }

    setProductCategory(category: string): void
    {
        this.myTableService.setProductCategory(category);
    }
    
    private getCurrentCountProduct(): number
    {
        return this.myTableService.CountRequestedProduct;
    }

    private getColorFontExceedLimitPrice(currentPrice: number, limitPrice: number = 500)
    {
        return currentPrice > limitPrice ? 'red' : '';
    }
}