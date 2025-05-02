import {ApplicationConfig, inject, provideAppInitializer, provideZoneChangeDetection} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {KeycloakService} from './services/utils/keycloak/keycloak.service';
import {provideToastr} from 'ngx-toastr';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {keycloakHttpInterceptor} from './services/utils/http/keycloak-http.interceptor';

export function kcFactory(kcService: KeycloakService) {
  return () => kcService.init();
}
export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideToastr({
      progressBar: true,
      closeButton: true,
      newestOnTop: true,
      tapToDismiss: true,
      positionClass: 'toast-top-right',
      timeOut: 8000
    }),
    provideHttpClient(
      withInterceptors([keycloakHttpInterceptor])
    ),
    provideAppInitializer(() => {
      const initFn = ((key: KeycloakService) => {
        return () => key.init()
      })(inject(KeycloakService));
      return initFn();
    })
  ]
};

