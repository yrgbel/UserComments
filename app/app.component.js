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
require("./rx-js.operators");
var core_1 = require("@angular/core");
var my_table_component_1 = require("./my-table/my-table.component");
var comment_service_1 = require("./shared/comment.service");
// Применение декоратора Component для класса AppComponent
// Декоратор используется для присвоения метаданных для класса AppComponent
// Для использования относительных путей, необходимо добавить свойство moduleId и установить значение для свойства module.id
// Данное свойство необходимо устанавливать в случае если в проекте используется загрузчик systemJS
var AppComponent = (function () {
    function AppComponent() {
    }
    AppComponent.prototype.addRowHandler = function () {
        this.myTable.refreshComments();
        console.log("Row with has been added.");
    };
    AppComponent.prototype.deleteRowHandler = function (id) {
        console.log("Row with ID=" + id + " has been deleted.");
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
        inputs: ["myTable"],
        providers: [comment_service_1.CommentService]
    })
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map