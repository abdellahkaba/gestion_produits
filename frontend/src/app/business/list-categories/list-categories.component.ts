import {Component, OnInit} from '@angular/core';
import {CategoriesService} from '../../services/services';
import {CategoryResponse} from '../../services/models/category-response';
import {ToastrService} from 'ngx-toastr';
import {Router, RouterLink} from '@angular/router';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-list-categories',
  imports: [
    NgIf,
    RouterLink
  ],
  templateUrl: './list-categories.component.html',
  styleUrl: './list-categories.component.css'
})
export class ListCategoriesComponent implements OnInit {

  response: CategoryResponse[] = [];
  constructor(
    private service: CategoriesService,
    private toastr: ToastrService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.getAllCategory()
  }

  // Liste des categories
  private getAllCategory(){
    this.service.getAllCategory()
      .subscribe({
        next: (categories: CategoryResponse[]) => {
          this.response = categories
        },
        error: (err) => {
          console.log("Erreur lors de chargement")
        }
      })
  }

  editCategory(categorie: any){
    this.router.navigate(['/edit-categorie', categorie.id])
  }

  deleteCategory(categorieId: number){
    if (confirm('Êtes-vous sûr de vouloir supprimer cette Categorie ?')) {
      this.service.deleteCategoryById({ id: categorieId }).subscribe({
        next: () => {
          this.toastr.success("Category supprimé avec succès");
          this.getAllCategory();
        },
        error: (err) => {
          console.log(err);
          this.toastr.error("Désolé, impossible de supprimer", "Oups !");
        }
      });
    }
  }
}
