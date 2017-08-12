import { Component, OnInit, EventEmitter, Output, AfterViewInit } from "@angular/core";
import { CommentService } from "../shared/comment.service"
import { UserComment } from "../shared/user-comment";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import {DatepickerModule} from 'ng2-bootstrap';
import * as moment from 'moment';

@Component({
    moduleId: module.id,
    selector: "add-comment",
    templateUrl: "add-comment.component.html",
    styleUrls: ["add-comment.component.css"]
})
export class AddCommentComponent implements OnInit, AfterViewInit {
        ngAfterViewInit(): void {
           let element: Element = document
             .querySelector("table[aria-activedescendant='activeDateId']");
             element.setAttribute("style", "margin: auto")
        }


    private comment: UserComment = new UserComment(null,"","",null);
    private commentAddForm: FormGroup;
    private focusTrigger = new EventEmitter<boolean>();
    private minDate: Date;
    private disabledDate: { dt: Date, mode: string };
    private showDatepicker: boolean = false;
    private changedDateView: string;
    
    @Output()
    addComment: EventEmitter<UserComment> = new EventEmitter<UserComment>();

    constructor(private commentService: CommentService,
        private fb: FormBuilder) {
        this.minDate = new Date();
    }

    private showPopup() {
        this.showDatepicker =  !this.showDatepicker;
    }

    private getDateView(date: any): string
    {
        return moment(date).format("DD.MM.YYYY");
    }

    private onSelectionDone(date: any) {
        this.changedDateView = this.getDateView(date);
        this.commentAddForm.value.date = date;
        this.showDatepicker = false;
    }

    ngOnInit(): void {
        this.buildForm();
        this.changedDateView = this.getDateView(this.minDate)
        this.commentAddForm.setValue({
            "username" : "",
            "date" : this.minDate,
            "commentText" : "" });
    }

    buildForm() {
        this.commentAddForm = this.fb.group({
            "username": [this.comment.username, [
                Validators.required,
                Validators.minLength(2),
                Validators.maxLength(40)
            ]],
            "commentText": [this.comment.commentText, [Validators.required]],
            "date": [this.comment.date, [Validators.required]]
        });

        this.commentAddForm
        .valueChanges
        .subscribe(data => this.onValueChange(data));

        this.onValueChange();
    }

    onValueChange(data?: any) {
        if (!this.commentAddForm) return;
        let form = this.commentAddForm;

        for (let field in this.formErrors) {
            this.formErrors[field] = "";
            // form.get - получение элемента управления
            let control = form.get(field);

            if (control && control.dirty && !control.valid) {
                let message = this.validationMessages[field];
                for (let key in control.errors) {
                    this.formErrors[field] += message[key] + " ";
                }
            }
        }
    }

    // Объект с ошибками, которые будут выведены в пользовательском интерфейсе
    formErrors = {
        "username": "",
        "commentText": "",
        "date": ""
    };

    // Объект с сообщениями ошибок
    validationMessages = {
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
    setDefaultValuesForComment() {
        this.comment.id = null;
        this.comment.username = "";
        this.comment.commentText = "";
        this.comment.date = null;
    }

    public onSubmit(commentForm: FormGroup) {
        this.comment.username = commentForm.value.username;
        this.comment.commentText = commentForm.value.commentText;
        this.comment.date = commentForm.value.date;

        this.commentService.addComment(this.comment)
            .subscribe(() => {
                this.addComment.emit();
                this.setDefaultValuesForComment();
                commentForm.controls["username"].reset();
                commentForm.controls["commentText"].reset();
                commentForm.value.date = new Date();
                this.focusTrigger.emit(true);
            });
    }
}