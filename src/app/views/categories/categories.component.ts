import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DataHandlerService} from "../../service/data-handler.service";
import {Category} from "../../model/Category";

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent implements OnInit {

  categories: Category[] = [];

  constructor(private dataHandler: DataHandlerService) {
  }

  ngOnInit(): void {
    this.categories = this.dataHandler.getCategories();
    console.log(this.categories);
  }


}
