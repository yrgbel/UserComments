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
var AddProductComponent = (function () {
    function AddProductComponent(myTableService) {
        this.myTableService = myTableService;
        this.addProduct = new core_1.EventEmitter();
    }
    AddProductComponent.prototype.ngOnInit = function () {
        this.setDefaultValues();
    };
    AddProductComponent.prototype.setDefaultValues = function () {
        this.productName = "";
        this.productPrice = 0.00;
        this.productCategory = "N/A";
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
    __metadata("design:paramtypes", [my_table_service_1.MyTableService])
], AddProductComponent);
exports.AddProductComponent = AddProductComponent;
//# sourceMappingURL=add-product.component.js.map