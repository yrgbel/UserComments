import { Component, Output, EventEmitter, Input, OnInit } from "@angular/core";
import { CommentService } from "../shared/comment.service"
import { UserComment } from "../shared/user-comment";

@Component({
    moduleId: module.id,
    selector: "my-table",
    templateUrl: "my-table.component.html",
    styleUrls: ["my-table.component.css"]
})
export class MyTableComponent implements OnInit {

    private comments: UserComment[] = [];

    ngOnInit(): void {
        this.refreshComments();
    }

    constructor(private commentService: CommentService)
    { }

    getStyles() {
        let styles = {
            "background-color": "greenyellow",
            "display": "inline"
        };
        return styles;
    }
    @Output()
    delete: EventEmitter<string> = new EventEmitter<string>();

    // закрытое поле
    @Output()
    private countRows: number = 0;

    private getCurrentCountComments(): number {
        return this.comments.length;
    }

    private getComments() {
        this.commentService
            .getComments()
            .subscribe(result => this.comments = result);
    }

    @Output()
    refreshComments(): void {
        this.getComments();
        this.countRows = this.comments.length;
    }

    private deleteComment(comment: UserComment): void {
        this.commentService.deleteComment(comment)
            .subscribe(() => {
                this.delete.emit(comment.id);
                this.refreshComments();
            });
    }

    private getColorFontExceedLimitDate(date: Date, limitDate: Date = new Date()) {
        return date > limitDate ? 'red' : '';
    }
}