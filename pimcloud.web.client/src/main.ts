import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { importProvidersFrom } from "@angular/core";
import { AppComponent } from "./app/app.component";
import { provideAnimations } from "@angular/platform-browser/animations";
import { BrowserModule, bootstrapApplication } from "@angular/platform-browser";
import { CommonModule } from "@angular/common";
import { AppRoutingModule } from "./app/app-routing.module";
import { HttpInterceptorService } from "./app/shared/services/httpInterceptor.service";
import { HTTP_INTERCEPTORS, withInterceptorsFromDi, provideHttpClient } from "@angular/common/http";
import { UserService } from "./app/shared/services/user.service";
import { TreeViewNodeService } from "./app/shared/services/treeViewNode.service";

bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(AppRoutingModule, CommonModule, BrowserModule),
        UserService,
        {
            provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true
        },
        TreeViewNodeService,
        {
            provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true
        },
        provideAnimations(),
        provideHttpClient(withInterceptorsFromDi())
    ]
})
    .catch((err) => console.error(err));
