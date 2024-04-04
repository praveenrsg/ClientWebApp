import { Component } from "@angular/core";
import { LayoutService } from "./service/app.layout.service";
import { Router } from "@angular/router";
import { UserService } from "../shared/services/user.service";
import { IUserInfo } from "../shared/interface/user.interface";
import { CurrencyPipe } from "@angular/common";
import { SidebarModule } from "primeng/sidebar";

@Component({
    selector: "app-profilemenu",
    templateUrl: "./app.profilesidebar.component.html",
    standalone: true,
    imports: [SidebarModule, CurrencyPipe]
})
export class AppProfileSidebarComponent {
    userDetail!: IUserInfo | null;
    userName:string="";
    constructor(public layoutService: LayoutService, private router: Router, public usersevice: UserService) {

    }

    get visible(): boolean {
        return this.layoutService.state.profileSidebarVisible;
    }

    set visible(_val: boolean) {
        this.layoutService.state.profileSidebarVisible = _val;
    }
    ngOnInit(): void {
        this.userDetail = this.usersevice.userDetail;
        this.userName = localStorage.getItem("userName") || "";
    }
    userSignOut() {
        localStorage.clear();
        sessionStorage.clear();
        this.router.navigate(["/login"]);
    }
}