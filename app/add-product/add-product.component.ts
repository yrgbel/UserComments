import { Component, OnInit, EventEmitter, Output } from "@angular/core";
import { MyTableService } from "../shared/my-table.service"
import { Product } from "../shared/Product";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { categoryValidator } from "./custom-validators";

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

    productAddForm: FormGroup;

    @Output()
    addProduct: EventEmitter<Product> = new EventEmitter<Product>();

    constructor(private myTableService: MyTableService,
        private fb: FormBuilder)
    { }

    ngOnInit(): void {
        this.setDefaultValues();
        this.buildForm();
    }

    buildForm() {
        this.productAddForm = this.fb.group({
            "productName": [this.productName, [
                Validators.required,
                Validators.minLength(4),
                Validators.maxLength(15)
            ]],
            "productPrice": [this.productPrice, [
                Validators.required
            ]],
            "productCategory": [this.productCategory, [
                Validators.required,
                categoryValidator
            ]]
        });

        this.productAddForm.valueChanges.subscribe(data => this.onValueChange(data));

        this.onValueChange();
    }
    onValueChange(data?: any) {
        if (!this.productAddForm) return;
        let form = this.productAddForm;

        for (let field in this.formErrors) {
            this.formErrors[field] = "";
            // form.get - получение элемента управления
            let control = form.get(field);

            if (control && control.dirty && !control.valid) {
                let message = this.validationMessages[field];
                for (let key in control.errors) {
                    this.formErrors[field] += message[key] + " ";
                }
            }
        }
    }

    // Объект с ошибками, которые будут выведены в пользовательском интерфейсе
    formErrors = {
        "productName": "",
        "productPrice": "",
        "productCategory": ""
    };

    // Объект с сообщениями ошибок
    validationMessages = {
        "productName": {
            "required": "Обязательное поле.",
            "minlength": "Значение должно быть не менее 4х символов.",
            "maxlength": "Значение не должно быть больше 15 символов."
        },
        "productPrice": {
            "required": "Обязательное поле."
        },
        "productCategory": {
            "required": "Обязательное поле.",
            "categoryValidator": "Должна быть выбрана конкретная категория."
        }
    };
    setDefaultValues() {
        this.productName = "";
        this.productPrice = 0.00;
        this.productCategory = "N/A";
    }

    getAllCategories(): string[] {
        return this.myTableService.getUniqueProductCategories();
    }

    public onSubmit() {
        let newProduct: Product = new Product(this.productName, this.productPrice, this.productCategory);
        this.myTableService.addProduct(newProduct);
        this.addProduct.emit();
        this.setDefaultValues();
    }
}