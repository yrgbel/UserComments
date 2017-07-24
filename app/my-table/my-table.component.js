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
var my_table_service_1 = require("./my-table.service");
var MyTableComponent = (function () {
    function MyTableComponent(myTableService) {
        this.myTableService = myTableService;
        this.delete = new core_1.EventEmitter();
        // закрытое поле
        this._countRows = this.GetAllProductCount;
    }
    MyTableComponent.prototype.getStyles = function () {
        var styles = {
            "background-color": "greenyellow",
            "display": "inline"
        };
        return styles;
    };
    Object.defineProperty(MyTableComponent.prototype, "countRows", {
        // setter для получения значения закрытого поля _countRows 
        get: function () {
            return this._countRows;
        },
        // setter для установки значения закрытого поля _countRows 
        set: function (value) {
            var allCountRows = this.GetAllProductCount;
            this._countRows = value > allCountRows ? allCountRows : value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MyTableComponent.prototype, "GetAllProductCount", {
        get: function () {
            return this.myTableService.CountAllProducts;
        },
        enumerable: true,
        configurable: true
    });
    MyTableComponent.prototype.GetProducts = function () {
        return this.myTableService.GetProducts(this.countRows);
    };
    MyTableComponent.prototype.deleteProduct = function (id) {
        this.myTableService.deleteById(id);
        this.delete.emit(id);
    };
    MyTableComponent.prototype.getCategories = function () {
        return this.myTableService.getUniqueProductCategories();
    };
    MyTableComponent.prototype.getProductsByCategory = function (category) {
        return this.myTableService.getUniqueProductsByCategory(category);
    };
    MyTableComponent.prototype.getColorFontExceedLimitPrice = function (currentPrice, limitPrice) {
        if (limitPrice === void 0) { limitPrice = 500; }
        return currentPrice > limitPrice ? 'red' : '';
    };
    return MyTableComponent;
}());
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], MyTableComponent.prototype, "delete", void 0);
MyTableComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: "my-table",
        templateUrl: "my-table.component.html",
        styleUrls: ["my-table.component.css"],
        inputs: ["countRows"],
        providers: [my_table_service_1.MyTableService]
    }),
    __metadata("design:paramtypes", [my_table_service_1.MyTableService])
], MyTableComponent);
exports.MyTableComponent = MyTableComponent;
//# sourceMappingURL=my-table.component.js.map