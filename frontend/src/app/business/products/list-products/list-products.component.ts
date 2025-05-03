import {Component, OnInit} from '@angular/core';
import {ProductsService} from '../../../services/services/products.service';
import {Router, RouterLink} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {ProductResponse} from '../../../services/models/product-response';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-list-products',
  imports: [
    RouterLink,
    NgIf
  ],
  templateUrl: './list-products.component.html',
  styleUrl: './list-products.component.css'
})
export class ListProductsComponent implements OnInit {

    response: ProductResponse[] = [];

    constructor(
      private service: ProductsService,
      private router: Router,
      private toastr: ToastrService,
    ) {
    }

    ngOnInit(): void {
        this.getAllProducts()
    }

    private getAllProducts(){
      this.service.getAllProducts()
        .subscribe({
          next: (products: ProductResponse[]) => {
            this.response = products
          },
          error: (err) => {
            console.log("Erreur lors de chargement")
          }
        })
    }

    editProduct(product: any){
      this.router.navigate(['/edit-product', product.id])
    }

   deleteProduct(programId: number){
    if (confirm('Êtes-vous sûr de vouloir supprimer cet Produit ?')) {
      this.service.deleteProductById({ id: programId }).subscribe({
        next: () => {
          this.toastr.success("Produit supprimé avec succès");
          this.getAllProducts();
        },
        error: (err) => {
          console.log(err);
          this.toastr.error("Désolé, impossible de supprimer", "Oups !");
        }
      });
    }
  }

}
