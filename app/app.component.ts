// Определение компонента app.component

// импорт декоратора Component из модуля @angular/core
import { Component, ViewChild } from '@angular/core';
import { MyTableComponent } from './my-table/my-table.component';
import { AddProductComponent } from './add-product/add-product.component';
import { MyTableService } from "./shared/my-table.service"

// Применение декоратора Component для класса AppComponent
// Декоратор используется для присвоения метаданных для класса AppComponent
// Для использования относительных путей, необходимо добавить свойство moduleId и установить значение для свойства module.id
// Данное свойство необходимо устанавливать в случае если в проекте используется загрузчик systemJS
@Component({
  moduleId: module.id,
  selector: 'my-app',                       // Селектор, который определяет какой элемент DOM дерева будет представлять компонент.
  templateUrl: 'app.component.html', // HTML разметка определяющая представление текущего компонента
  inputs : ["myTable"],
  providers: [MyTableService]
})
export class AppComponent {
   @ViewChild(MyTableComponent)
   private myTable: MyTableComponent;

   get getAllProductCount(): number
   {
     return this.myTable.getAllProductCount;
   }

   get catigories(): string[]
   {
     return this.myTable.getCategories();
   }

   deleteRowHandler(id: number): void
   {
      console.log("Row with ID=" + id + " has been deleted.");
   }

   private refreshProducts(count?: number)
   {
      this.myTable.refreshProducts(count);
   }

   addRowHandler(): void{
    this.refreshProducts();
     console.log("Row with has been added.");
   }

   onChangeCategory(category: string)
   {
      this.myTable.setProductCategory(category);
      this.refreshProducts();
   }

 } // Класс определяющий поведение компонента
