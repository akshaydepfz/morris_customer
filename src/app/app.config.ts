import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';
export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes, withViewTransitions()),provideHttpClient(withFetch()),provideClientHydration()
    ,provideAnimations(),  provideToastr({
      // timeOut: 400,
      positionClass: 'toast-bottom-right', // Set position to bottom-right
      preventDuplicates: true,
    }),
]
};
