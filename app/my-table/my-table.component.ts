import { Component, Output, EventEmitter } from "@angular/core";
import { MyTableService } from "./my-table.service"
import { Product } from "./Product";

@Component({
    moduleId : module.id,
    selector: "my-table",
    templateUrl: "my-table.component.html",
    styleUrls: ["my-table.component.css"],
    inputs: ["countRows"],
    providers: [MyTableService]
})
export class MyTableComponent {
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
    private _countRows: number = this.GetAllProductCount;
    // setter для получения значения закрытого поля _countRows 
    get countRows(): number
    {
        return this._countRows;
    }
    // setter для установки значения закрытого поля _countRows 
    set countRows(value: number)
    {
        let allCountRows = this.GetAllProductCount;
        this._countRows = value > allCountRows ? allCountRows : value;
    } 

    get GetAllProductCount(): number
    {
        return this.myTableService.CountAllProducts;
    }

    private GetProducts(): Array<Product>
    {
        return this.myTableService.GetProducts(this.countRows);
    }

    private deleteProduct(id: number): void
    {
        this.myTableService.deleteById(id);
        this.delete.emit(id);
    }

    getCategories(): string[]
    {
        return this.myTableService.getUniqueProductCategories();
    }

    getProductsByCategory(category: string): Product[]
    {
         return this.myTableService.getUniqueProductsByCategory(category);
    }

    private getColorFontExceedLimitPrice(currentPrice: number, limitPrice: number = 500)
    {
        return currentPrice > limitPrice ? 'red' : '';
    }
}