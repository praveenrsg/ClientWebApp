import { Component, ElementRef, ViewChild } from "@angular/core";
import { LayoutService } from "./service/app.layout.service";
import { AppMenuComponent } from "./app.menu.component";
import { RouterLink } from "@angular/router";
import { UserService } from "../shared/services/user.service";
import { IUserInfo } from "../shared/interface/user.interface";

@Component({
    selector: "app-sidebar",
    templateUrl: "./app.sidebar.component.html",
    standalone: true,
    imports: [RouterLink, AppMenuComponent]
})
export class AppSidebarComponent {
    timeout: any = null;
    navigateTo!: string;
    @ViewChild("menuContainer") menuContainer!: ElementRef;
    userDetail!: IUserInfo;
    constructor(public layoutService: LayoutService, private userService: UserService, public el: ElementRef) { }

    ngOnInit() {
        if (this.userService?.userDetail) {
            this.userDetail = this.userService?.userDetail;
            // this.layoutService.state.sidebarActive = this.userDetail.enableSideBar;
        }
    }
    onMouseEnter() {
        if (!this.layoutService.state.anchored) {
            if (this.timeout) {
                clearTimeout(this.timeout);
                this.timeout = null;
            }
            this.layoutService.state.sidebarActive = true;
        }
    }

    onMouseLeave() {
        if (!this.layoutService.state.anchored) {
            if (!this.timeout) {
                this.timeout = setTimeout(() => this.layoutService.state.sidebarActive = false, 300);
            }
        }
    }

    anchor() {
        this.layoutService.state.anchored = !this.layoutService.state.anchored;
    }
}
