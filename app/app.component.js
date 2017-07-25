// Определение компонента app.component
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
// импорт декоратора Component из модуля @angular/core
var core_1 = require("@angular/core");
var my_table_component_1 = require("./my-table/my-table.component");
// Применение декоратора Component для класса AppComponent
// Декоратор используется для присвоения метаданных для класса AppComponent
// Для использования относительных путей, необходимо добавить свойство moduleId и установить значение для свойства module.id
// Данное свойство необходимо устанавливать в случае если в проекте используется загрузчик systemJS
var AppComponent = (function () {
    function AppComponent() {
    }
    Object.defineProperty(AppComponent.prototype, "GetAllProductCount", {
        get: function () {
            return this.myTable.GetAllProductCount;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppComponent.prototype, "catigories", {
        get: function () {
            return this.myTable.getCategories();
        },
        enumerable: true,
        configurable: true
    });
    AppComponent.prototype.deleteRowHandler = function (id) {
        console.log("Row with ID=" + id + " has been deleted.");
    };
    AppComponent.prototype.onChangeCategory = function (category) {
        this.myTable.setProductCategory(category);
    };
    return AppComponent;
}()); // Класс определяющий поведение компонента
__decorate([
    core_1.ViewChild(my_table_component_1.MyTableComponent),
    __metadata("design:type", my_table_component_1.MyTableComponent)
], AppComponent.prototype, "myTable", void 0);
AppComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'my-app',
        templateUrl: 'app.component.html',
        inputs: ["myTable"]
    })
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map