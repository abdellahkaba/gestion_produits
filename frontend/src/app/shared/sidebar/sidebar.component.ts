import {Component, OnInit} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {KeycloakService} from '../../services/utils/keycloak/keycloak.service';

@Component({
  selector: 'app-sidebar',
  imports: [
    RouterOutlet,
    RouterLink
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit{

  constructor(
    private keycloakService: KeycloakService
  ) {
  }
  ngOnInit() {
    // TODO document why this method 'ngOnInit' is empty
  }
  async logout() {
    await this.keycloakService.logout();
  }

}
