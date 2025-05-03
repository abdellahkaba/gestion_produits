import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {CategoriesService} from '../../../services/services/categories.service';
import {CategoryRequest} from '../../../services/models/category-request';
import {NgForOf, NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-form-categories',
  imports: [
    NgForOf,
    NgIf,
    FormsModule
  ],
  templateUrl: './form-categories.component.html',
  styleUrl: './form-categories.component.css'
})
export class FormCategoriesComponent implements OnInit {

  errorMsg: Array<string> = [];
  isEditMode = false;

  request: CategoryRequest = {
    id: undefined,
    name: '',
    description: ''
  }

  constructor(
    private service: CategoriesService,
    private toastr: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.loadCategory()
  }

  loadCategory() {
    const categorieId = this.activatedRoute.snapshot.params['categorieId']
    if (categorieId) {
      this.isEditMode = true;
      this.service.getCategoryById({
        'id': categorieId
      }).subscribe({
        next: (categorie) => {
          this.request = {
            id: categorie.id,
            name: categorie.name as string,
            description: categorie.description as string
          }
        }
      })
    }
  }

  saveCategory() {
    if (this.isEditMode){
      this.updateCategory();
    }else {
      this.newCategory()
    }
  }

  private newCategory(){
      this.service.newCategory({
        body: this.request
      }).subscribe({
        next: data => {
          this.toastr.success("Category ajouté")
          this.router.navigate(['/categories'])
        },
        error: (err) => {
          if (err.error.validationErrors) {
            this.errorMsg = err.error.validationErrors;
          } else {
            this.toastr.error('Désolé, une erreur est survenue ou Subject existe', 'Oups!');
          }
        }
      })
    }



  private updateCategory(){
    this.service.updateCategory({
      body: this.request
    }).subscribe({
      next: () =>{
        this.toastr.success("Category mis a jour");
        this.router.navigate(['/categories']);
      },
      error: (err) => {
        if (err.error.validationErrors) {
          this.errorMsg = err.error.validationErrors;
        } else {
          this.toastr.error('Désolé, une erreur est survenue', 'Oups!');
        }
      }
    })
  }

}


