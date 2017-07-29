import { Component, OnInit, EventEmitter, Output} from "@angular/core";
import { MyTableService } from "../shared/my-table.service"
import { Product } from "../shared/Product";

@Component({
    moduleId: module.id,
    selector: "add-product",
    templateUrl: "add-product.component.html",
    styleUrls: ["add-product.component.css"]
})
export class AddProductComponent implements OnInit {

    private productName: string;
    private productPrice: number;
    private productCategory: string;

    @Output()
    addProduct : EventEmitter<Product> = new EventEmitter<Product>();

    constructor(private myTableService: MyTableService)
    { }

    ngOnInit(): void {
        this.setDefaultValues();
    }

    setDefaultValues()
    {
        this.productName = "";
        this.productPrice = 0.00;
        this.productCategory = "N/A";
    }

    public onSubmit()
    {
         let newProduct : Product = new Product(this.productName, this.productPrice, this.productCategory);
         this.myTableService.addProduct(newProduct);
         this.addProduct.emit();
         this.setDefaultValues();
    }
}