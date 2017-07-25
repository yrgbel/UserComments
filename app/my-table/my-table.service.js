"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var linq_es2015_1 = require("linq-es2015");
var MyTableService = (function () {
    function MyTableService() {
        this.products = [{ id: 1, name: "product 1", price: 100, category: "Category 1" },
            { id: 2, name: "product 2", price: 200, category: "Category 2" },
            { id: 3, name: "product 3", price: 300, category: "Category 2" },
            { id: 4, name: "product 4", price: 400, category: "Category 3" },
            { id: 5, name: "product 5", price: 500, category: "Category 1" },
            { id: 6, name: "product 6", price: 600, category: "Category 1" },
            { id: 7, name: "product 7", price: 700, category: "Category 2" },
            { id: 8, name: "product 8", price: 800, category: "Category 3" },
            { id: 9, name: "product 9", price: 900, category: "Category 3" },
            { id: 10, name: "product 10", price: 1000, category: "Category 3" }];
        this.allCategories = "All Products";
        this.isFilterCategoryEnabled = false;
    }
    MyTableService.prototype.GetProducts = function (count) {
        var _this = this;
        if (count === void 0) { count = this.products.length; }
        var productsItems = [];
        if (this.isFilterCategoryEnabled) {
            productsItems = linq_es2015_1.asEnumerable(this.products)
                .Where(function (p) { return p.category == _this.currentSelectedCategory; })
                .ToArray().slice(0, count);
        }
        else {
            productsItems = this.products.slice(0, count);
        }
        this.countRequestedProduct = productsItems.length;
        return productsItems;
    };
    MyTableService.prototype.getUniqueProductCategories = function () {
        var categories = linq_es2015_1.asEnumerable(this.products).Select(function (p) { return p.category; }).Distinct()
            .OrderBy(function (p) { return p; }).ToArray();
        categories.unshift(this.allCategories);
        return categories;
    };
    MyTableService.prototype.setProductCategory = function (category) {
        this.currentSelectedCategory = category;
        this.isFilterCategoryEnabled = category !== this.allCategories;
    };
    MyTableService.prototype.deleteById = function (id) {
        for (var i = 0; i < this.products.length; i++) {
            if (this.products[i].id === id) {
                this.products.splice(i, 1);
                break;
            }
        }
    };
    Object.defineProperty(MyTableService.prototype, "CountAllProducts", {
        get: function () {
            return this.products.length;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MyTableService.prototype, "CountRequestedProduct", {
        get: function () {
            return this.countRequestedProduct;
        },
        enumerable: true,
        configurable: true
    });
    return MyTableService;
}());
MyTableService = __decorate([
    core_1.Injectable()
], MyTableService);
exports.MyTableService = MyTableService;
//# sourceMappingURL=my-table.service.js.map