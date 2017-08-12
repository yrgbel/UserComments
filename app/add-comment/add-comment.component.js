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
var user_comment_1 = require("../shared/user-comment");
var forms_1 = require("@angular/forms");
var moment = require("moment");
var AddCommentComponent = (function () {
    function AddCommentComponent(commentService, fb) {
        this.commentService = commentService;
        this.fb = fb;
        this.comment = new user_comment_1.UserComment(null, "", "", null);
        this.focusTrigger = new core_1.EventEmitter();
        this.showDatepicker = false;
        this.addComment = new core_1.EventEmitter();
        // Объект с ошибками, которые будут выведены в пользовательском интерфейсе
        this.formErrors = {
            "username": "",
            "commentText": "",
            "date": ""
        };
        // Объект с сообщениями ошибок
        this.validationMessages = {
            "username": {
                "required": "Обязательное поле.",
                "minlength": "Значение должно быть не менее 2 символов.",
                "maxlength": "Значение не должно быть больше 40 символов."
            },
            "commentText": {
                "required": "Обязательное поле."
            },
            "date": {
                "required": "Обязательное поле."
                // "required": "Неверный формат даты. Выберите дату через календарь или задайте дату вручную в формате дд.мм.гггг пример: 31.08.2016"
            }
        };
        this.minDate = new Date();
    }
    AddCommentComponent.prototype.ngAfterViewInit = function () {
        var element = document
            .querySelector("table[aria-activedescendant='activeDateId']");
        element.setAttribute("style", "margin: auto");
    };
    AddCommentComponent.prototype.showPopup = function () {
        this.showDatepicker = !this.showDatepicker;
    };
    AddCommentComponent.prototype.getDateView = function (date) {
        return moment(date).format("DD.MM.YYYY");
    };
    AddCommentComponent.prototype.onSelectionDone = function (date) {
        this.changedDateView = this.getDateView(date);
        this.commentAddForm.value.date = date;
        this.showDatepicker = false;
    };
    AddCommentComponent.prototype.ngOnInit = function () {
        this.buildForm();
        this.changedDateView = this.getDateView(this.minDate);
        this.commentAddForm.setValue({
            "username": "",
            "date": this.minDate,
            "commentText": ""
        });
    };
    AddCommentComponent.prototype.buildForm = function () {
        var _this = this;
        this.commentAddForm = this.fb.group({
            "username": [this.comment.username, [
                    forms_1.Validators.required,
                    forms_1.Validators.minLength(2),
                    forms_1.Validators.maxLength(40)
                ]],
            "commentText": [this.comment.commentText, [forms_1.Validators.required]],
            "date": [this.comment.date, [forms_1.Validators.required]]
        });
        this.commentAddForm
            .valueChanges
            .subscribe(function (data) { return _this.onValueChange(data); });
        this.onValueChange();
    };
    AddCommentComponent.prototype.onValueChange = function (data) {
        if (!this.commentAddForm)
            return;
        var form = this.commentAddForm;
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
    AddCommentComponent.prototype.setDefaultValuesForComment = function () {
        this.comment.id = null;
        this.comment.username = "";
        this.comment.commentText = "";
        this.comment.date = null;
    };
    AddCommentComponent.prototype.onSubmit = function (commentForm) {
        var _this = this;
        this.comment.username = commentForm.value.username;
        this.comment.commentText = commentForm.value.commentText;
        this.comment.date = commentForm.value.date;
        this.commentService.addComment(this.comment)
            .subscribe(function () {
            _this.addComment.emit();
            _this.setDefaultValuesForComment();
            commentForm.controls["username"].reset();
            commentForm.controls["commentText"].reset();
            commentForm.value.date = new Date();
            _this.focusTrigger.emit(true);
        });
    };
    return AddCommentComponent;
}());
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], AddCommentComponent.prototype, "addComment", void 0);
AddCommentComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: "add-comment",
        templateUrl: "add-comment.component.html",
        styleUrls: ["add-comment.component.css"]
    }),
    __metadata("design:paramtypes", [comment_service_1.CommentService,
        forms_1.FormBuilder])
], AddCommentComponent);
exports.AddCommentComponent = AddCommentComponent;
//# sourceMappingURL=add-comment.component.js.map