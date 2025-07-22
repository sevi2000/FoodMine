import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { provideHttpClient } from '@angular/common/http';

appConfig.providers = [
  provideHttpClient(),
  provideRouter(routes),
  provideAnimations(),
   provideToastr({
      timeOut: 3000,
    positionClass: 'toast-bottom-right',
      preventDuplicates: true,
      closeButton: true,
      progressBar: true,
    })
]
bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
