import { Component, ElementRef, ViewChild } from "@angular/core";
import { LayoutService } from "src/app/layout/service/app.layout.service";
import { ButtonModule } from "primeng/button";
import { InputTextModule } from "primeng/inputtext";
import { AppBreadcrumbComponent } from "./app.breadcrumb.component";

@Component({
    selector: "app-topbar",
    templateUrl: "./app.topbar.component.html",
    standalone: true,
    imports: [AppBreadcrumbComponent, InputTextModule, ButtonModule]
})
export class AppTopbarComponent {

    @ViewChild("menubutton") menuButton!: ElementRef;

    constructor(public layoutService: LayoutService) { }

    onMenuButtonClick() {
        this.layoutService.onMenuToggle();
    }

    onProfileButtonClick() {
        this.layoutService.showProfileSidebar();
    }
    onConfigButtonClick() {
        this.layoutService.showConfigSidebar();
    }

}