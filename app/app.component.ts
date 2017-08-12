// Определение компонента app.component

// импорт декоратора Component из модуля @angular/core
import "./rx-js.operators";
import { Component, ViewChild } from '@angular/core';
import { MyTableComponent } from './my-table/my-table.component';
import { AddCommentComponent } from './add-comment/add-comment.component';
import { CommentService } from "./shared/comment.service";
// Применение декоратора Component для класса AppComponent
// Декоратор используется для присвоения метаданных для класса AppComponent
// Для использования относительных путей, необходимо добавить свойство moduleId и установить значение для свойства module.id
// Данное свойство необходимо устанавливать в случае если в проекте используется загрузчик systemJS
@Component({
  moduleId: module.id,
  selector: 'my-app',                       // Селектор, который определяет какой элемент DOM дерева будет представлять компонент.
  templateUrl: 'app.component.html', // HTML разметка определяющая представление текущего компонента
  inputs: ["myTable"],
  providers:    [ CommentService ]
})
export class AppComponent {
  @ViewChild(MyTableComponent)
  private myTable: MyTableComponent;

  addRowHandler(): void {
    this.myTable.refreshComments();
    console.log("Row with has been added.");
  }

  deleteRowHandler(id: number): void {
    console.log("Row with ID=" + id + " has been deleted.");
  }

} // Класс определяющий поведение компонента
