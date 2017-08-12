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
var comment_service_1 = require("../shared/comment.service");
var MyTableComponent = (function () {
    function MyTableComponent(commentService) {
        this.commentService = commentService;
        this.comments = [];
        this.delete = new core_1.EventEmitter();
        // закрытое поле
        this.countRows = 0;
    }
    MyTableComponent.prototype.ngOnInit = function () {
        this.refreshComments();
    };
    MyTableComponent.prototype.getStyles = function () {
        var styles = {
            "background-color": "greenyellow",
            "display": "inline"
        };
        return styles;
    };
    MyTableComponent.prototype.getCurrentCountComments = function () {
        return this.comments.length;
    };
    MyTableComponent.prototype.getComments = function () {
        var _this = this;
        this.commentService
            .getComments()
            .subscribe(function (result) { return _this.comments = result; });
    };
    MyTableComponent.prototype.refreshComments = function () {
        this.getComments();
        this.countRows = this.comments.length;
    };
    MyTableComponent.prototype.deleteComment = function (comment) {
        var _this = this;
        this.commentService.deleteComment(comment)
            .subscribe(function () {
            _this.delete.emit(comment.id);
            _this.refreshComments();
        });
    };
    MyTableComponent.prototype.getColorFontExceedLimitDate = function (date, limitDate) {
        if (limitDate === void 0) { limitDate = new Date(); }
        return date > limitDate ? 'red' : '';
    };
    return MyTableComponent;
}());
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], MyTableComponent.prototype, "delete", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Number)
], MyTableComponent.prototype, "countRows", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MyTableComponent.prototype, "refreshComments", null);
MyTableComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: "my-table",
        templateUrl: "my-table.component.html",
        styleUrls: ["my-table.component.css"]
    }),
    __metadata("design:paramtypes", [comment_service_1.CommentService])
], MyTableComponent);
exports.MyTableComponent = MyTableComponent;
//# sourceMappingURL=my-table.component.js.map