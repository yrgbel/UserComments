"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
    }
    MyTableService.prototype.GetProducts = function (count) {
        if (count === void 0) { count = this.products.length; }
        return this.products.slice(0, count);
    };
    MyTableService.prototype.getUniqueProductCategories = function () {
        return linq_es2015_1.asEnumerable(this.products).Select(function (p) { return p.category; }).Distinct().ToArray();
    };
    MyTableService.prototype.getUniqueProductsByCategory = function (category) {
        return linq_es2015_1.asEnumerable(this.products).Where(function (p) { return p.category == category; }).ToArray();
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
    return MyTableService;
}());
exports.MyTableService = MyTableService;
//# sourceMappingURL=my-table.service.js.map