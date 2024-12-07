import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';  // Import provideHttpClient

// Modify your appConfig to include provideHttpClient in the providers array
bootstrapApplication(AppComponent, {
  ...appConfig,  // Spread existing appConfig if needed
  providers: [
    ...appConfig.providers,  // Ensure any existing providers are retained
    provideHttpClient(),  // Add provideHttpClient here
  ],
})
  .catch((err) => console.error(err));