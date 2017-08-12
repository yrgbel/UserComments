// Класс AppModule - точка входа в данное приложение 
// Angular модуль - класс с декоратором NgModule
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var app_component_1 = require("./app.component");
var my_table_component_1 = require("./my-table/my-table.component");
var add_comment_component_1 = require("./add-comment/add-comment.component");
var focus_directive_1 = require("./focus.directive");
var ng2_bootstrap_1 = require("ng2-bootstrap");
// @NgModule - декоратор, который определяет данные для создаваемого модуля.
// Для того чтобы приложение могло выполняться в браузере, текущий модуль (корневой модуль)
// должен выполнить импорт модуля BrowserModule взятого из @angular/platform-browser 
// Задача BrowserModule зарегистрировать основные сервис провайдеры приложения, 
// а также добавить общие директивы такие как ngIf и ngFor
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [platform_browser_1.BrowserModule,
            ng2_bootstrap_1.DatepickerModule.forRoot(),
            forms_1.FormsModule,
            forms_1.ReactiveFormsModule,
            http_1.HttpModule],
        declarations: [app_component_1.AppComponent,
            my_table_component_1.MyTableComponent,
            add_comment_component_1.AddCommentComponent,
            focus_directive_1.FocusDirective],
        bootstrap: [app_component_1.AppComponent] // компонент с которого начинается отображение приложения
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map