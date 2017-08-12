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
var http_1 = require("@angular/http");
var Observable_1 = require("rxjs/Observable");
var user_comment_1 = require("./user-comment");
var CommentService = (function () {
    function CommentService(http) {
        this.http = http;
        this.url = "http://localhost:2403/comments";
    }
    CommentService.prototype.getComments = function (count) {
        var getLimitIfNeedIt = function (count) { return count ? ", '$limit': " + count : ""; };
        return this.http
            .get(this.url + '/?{"$sort":{"date":-1}' + getLimitIfNeedIt(count) + "}")
            .map(this.extractComments)
            .catch(this.handleError);
    };
    CommentService.prototype.addComment = function (comment) {
        return this.http.post(this.url, comment)
            .map(this.extractComment)
            .catch(this.handleError);
    };
    CommentService.prototype.deleteComment = function (comment) {
        return this.http.delete(this.url + "/" + comment.id)
            .catch(this.handleError);
    };
    CommentService.prototype.getCountAllComments = function () {
        return this.http.get(this.url + "/?{'id':'count'}")
            .map(function (response) { return Number(response.text); })
            .catch(this.handleError);
    };
    CommentService.prototype.extractComments = function (response) {
        var res = response.json();
        var comments = [];
        for (var i = 0; i < res.length; i++) {
            comments.push(new user_comment_1.UserComment(res[i].id, res[i].username, res[i].commentText, new Date(res[i].date)));
        }
        return comments;
    };
    CommentService.prototype.extractComment = function (response) {
        var res = response.json();
        var comment = new user_comment_1.UserComment(res.id, res.username, res.commentText, new Date(res.data));
        return comment;
    };
    CommentService.prototype.handleError = function (error, cought) {
        var message = "";
        if (error instanceof http_1.Response) {
            var errorData = error.json().error || JSON.stringify(error.json());
            message = error.status + " - " + (error.statusText || '') + " " + errorData;
        }
        else {
            message = error.message ? error.message : error.toString();
        }
        console.error(message);
        return Observable_1.Observable.throw(message);
    };
    return CommentService;
}());
CommentService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], CommentService);
exports.CommentService = CommentService;
//# sourceMappingURL=comment.service.js.map