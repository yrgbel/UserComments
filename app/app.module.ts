// Класс AppModule - точка входа в данное приложение 
// Angular модуль - класс с декоратором NgModule

import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule }      from '@angular/http';

import { AppComponent }   from './app.component';
import { MyTableComponent } from './my-table/my-table.component';
import { AddCommentComponent } from './add-comment/add-comment.component';

import { FocusDirective } from "./focus.directive";

import { DatepickerModule } from 'ng2-bootstrap';
// @NgModule - декоратор, который определяет данные для создаваемого модуля.
// Для того чтобы приложение могло выполняться в браузере, текущий модуль (корневой модуль)
// должен выполнить импорт модуля BrowserModule взятого из @angular/platform-browser 
// Задача BrowserModule зарегистрировать основные сервис провайдеры приложения, 
// а также добавить общие директивы такие как ngIf и ngFor
@NgModule({
  imports:      [ BrowserModule,
                  DatepickerModule.forRoot(),
                  FormsModule,
                  ReactiveFormsModule,
                  HttpModule ],
  declarations: [ AppComponent,
                  MyTableComponent,
                  AddCommentComponent,
                  FocusDirective ], // корневой компонент данного приложения
  bootstrap:    [ AppComponent ]  // компонент с которого начинается отображение приложения
})

export class AppModule {
 } 