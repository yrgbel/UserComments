import { Injectable, OnInit } from '@angular/core';
import { asEnumerable } from 'linq-es2015';
import { Http, Response } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { UserComment } from "./user-comment"

@Injectable()
export class CommentService {

    private url: string = "http://localhost:2403/comments";

    constructor(private http: Http) { }

    getComments(count?: number): Observable<UserComment[]> {
        let getLimitIfNeedIt = (count: number) => count ? `, '$limit': ${count}` : "";
        return this.http
            .get(this.url + '/?{"$sort":{"date":-1}' + getLimitIfNeedIt(count) + "}")
            .map(this.extractComments)
            .catch(this.handleError);
    }

    addComment(comment: UserComment): Observable<UserComment> {
        return this.http.post(this.url, comment)
            .map(this.extractComment)
            .catch(this.handleError);
    }

    deleteComment(comment: UserComment): Observable<Response> {
        return this.http.delete(this.url + "/" + comment.id)
            .catch(this.handleError);
    }

    getCountAllComments(): Observable<number> {
        return this.http.get(this.url + "/?{'id':'count'}")
            .map(response => Number(response.text))
            .catch(this.handleError);
    }

    private extractComments(response: Response): UserComment[] {
        let res = response.json();
        let comments: UserComment[] = [];
        for (let i = 0; i < res.length; i++) {
            comments.push(new UserComment(res[i].id, res[i].username,
                res[i].commentText, new Date(res[i].date)));
        }
        return comments;
    }

    private extractComment(response: Response): UserComment {
        let res = response.json();
        let comment = new UserComment(res.id, res.username,
            res.commentText, new Date(res.data));
        return comment;
    }

    private handleError(error: any, cought: Observable<any>): any {
        let message = "";

        if (error instanceof Response) {
            let errorData = error.json().error || JSON.stringify(error.json());
            message = `${error.status} - ${error.statusText || ''} ${errorData}`
        } else {
            message = error.message ? error.message : error.toString();
        }

        console.error(message);

        return Observable.throw(message);
    }
}