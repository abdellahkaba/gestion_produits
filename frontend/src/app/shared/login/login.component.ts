import {Component, OnInit} from '@angular/core';
import {KeycloakService} from '../../services/utils/keycloak/keycloak.service';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  constructor(
    private key: KeycloakService
  ) {
  }
  async ngOnInit(): Promise<void> {
    await this.key.login()
  }
}

