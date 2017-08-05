"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var my_table_service_1 = require("../shared/my-table.service");
var Product_1 = require("../shared/Product");
var forms_1 = require("@angular/forms");
var custom_validators_1 = require("./custom-validators");
var AddProductComponent = (function () {
    function AddProductComponent(myTableService, fb) {
        this.myTableService = myTableService;
        this.fb = fb;
        this.addProduct = new core_1.EventEmitter();
        // Объект с ошибками, которые будут выведены в пользовательском интерфейсе
        this.formErrors = {
            "productName": "",
            "productPrice": "",
            "productCategory": ""
        };
        // Объект с сообщениями ошибок
        this.validationMessages = {
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
    }
    AddProductComponent.prototype.ngOnInit = function () {
        this.setDefaultValues();
        this.buildForm();
    };
    AddProductComponent.prototype.buildForm = function () {
        var _this = this;
        this.productAddForm = this.fb.group({
            "productName": [this.productName, [
                    forms_1.Validators.required,
                    forms_1.Validators.minLength(4),
                    forms_1.Validators.maxLength(15)
                ]],
            "productPrice": [this.productPrice, [
                    forms_1.Validators.required
                ]],
            "productCategory": [this.productCategory, [
                    forms_1.Validators.required,
                    custom_validators_1.categoryValidator
                ]]
        });
        this.productAddForm.valueChanges.subscribe(function (data) { return _this.onValueChange(data); });
        this.onValueChange();
    };
    AddProductComponent.prototype.onValueChange = function (data) {
        if (!this.productAddForm)
            return;
        var form = this.productAddForm;
        for (var field in this.formErrors) {
            this.formErrors[field] = "";
            // form.get - получение элемента управления
            var control = form.get(field);
            if (control && control.dirty && !control.valid) {
                var message = this.validationMessages[field];
                for (var key in control.errors) {
                    this.formErrors[field] += message[key] + " ";
                }
            }
        }
    };
    AddProductComponent.prototype.setDefaultValues = function () {
        this.productName = "";
        this.productPrice = 0.00;
        this.productCategory = "N/A";
    };
    AddProductComponent.prototype.getAllCategories = function () {
        return this.myTableService.getUniqueProductCategories();
    };
    AddProductComponent.prototype.onSubmit = function () {
        var newProduct = new Product_1.Product(this.productName, this.productPrice, this.productCategory);
        this.myTableService.addProduct(newProduct);
        this.addProduct.emit();
        this.setDefaultValues();
    };
    return AddProductComponent;
}());
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], AddProductComponent.prototype, "addProduct", void 0);
AddProductComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: "add-product",
        templateUrl: "add-product.component.html",
        styleUrls: ["add-product.component.css"]
    }),
    __metadata("design:paramtypes", [my_table_service_1.MyTableService,
        forms_1.FormBuilder])
], AddProductComponent);
exports.AddProductComponent = AddProductComponent;
//# sourceMappingURL=add-product.component.js.map