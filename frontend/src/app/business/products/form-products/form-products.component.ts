import {Component, OnInit} from '@angular/core';
import {ProductRequest} from '../../../services/models/product-request';
import {ProductResponse} from '../../../services/models/product-response';
import {ProductsService} from '../../../services/services/products.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CategoriesService} from '../../../services/services/categories.service';
import {ToastrService} from 'ngx-toastr';
import {CategoryResponse} from '../../../services/models/category-response';
import {NgForOf, NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-form-products',
  imports: [
    NgIf,
    NgForOf,
    FormsModule
  ],
  templateUrl: './form-products.component.html',
  styleUrl: './form-products.component.css'
})
export class FormProductsComponent implements OnInit{

    errorMsg: Array<string> = [];
    isEditMode = false;

    request: ProductRequest = {
      id: undefined,
      name: '',
      price: 0,
      quantity: 0,
      description: '',
      categorieId: 0
    }

    response: ProductResponse[] = []

    constructor(
      private service: ProductsService,
      private toastr: ToastrService,
      private router: Router,
      private activatedRoute: ActivatedRoute,
      private categoryService: CategoriesService
    ) {
    }

    categoryResponse: CategoryResponse[] = []

    ngOnInit(): void {
      this.loadCategory()
      this.loadProduct()
    }

    loadCategory(){
      this.categoryService.getAllCategory().subscribe({
        next: (categories: CategoryResponse[]) => {
          this.categoryResponse = categories
        },
        error:(err) => {
          console.log('Erreur lors du chargement')
        }
      })
    }

  loadProduct(){
    const productId = this.activatedRoute.snapshot.params['productId'];
    if (productId){
      this.isEditMode = true
      this.service.getProductById({
        'id': productId,
      }).subscribe({
        next: (product) => {
          const selectedCategory = this.categoryResponse.find(categorie => categorie.name === product.categorieName);
          this.request = {
            id: product.id,
            name: product.name as string,
            price: product.price as number,
            quantity: product.quantity as number,
            description: product.description as string,
            categorieId: selectedCategory?.id ?? 0
          }
        }
      })
    }
  }

  saveProduct(){
      if (this.isEditMode){
        this.updateProduct()
      }else {
        this.newProduct()
      }
  }
  private newProduct(){
    this.service.newProduct({
      body: this.request
    }).subscribe({
      next: data => {
        this.toastr.success("Produit ajouté")
        this.router.navigate(['/products'])
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

  private updateProduct(){
    this.service.updateProduct({
      body: this.request
    }).subscribe({
      next: () =>{
        this.toastr.success("Produit mis a jour");
        this.router.navigate(['/products']);
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
