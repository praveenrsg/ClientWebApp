import { Component, OnDestroy, Renderer2, ViewChild } from "@angular/core";
import { NavigationEnd, Router, RouterOutlet } from "@angular/router";
import { filter, Subscription } from "rxjs";
import { MenuService } from "./app.menu.service";
import { AppSidebarComponent } from "./app.sidebar.component";
import { AppTopbarComponent } from "./app.topbar.component";
import { LayoutService } from "./service/app.layout.service";
import { ActivatedRoute } from "@angular/router";
import { AppConfigComponent } from "./config/app.config.component";
import { AppProfileSidebarComponent } from "./app.profilesidebar.component";
import { AppBreadcrumbComponent } from "./app.breadcrumb.component";
import { NgClass } from "@angular/common";
import { UserService } from "../shared/services/user.service";
import { TreeViewNodeService } from "../shared/services/treeViewNode.service";
@Component({
    selector: "app-layout",
    templateUrl: "./app.layout.component.html",
    styleUrls: ["./app.layout.component.scss"],
    standalone: true,
    imports: [NgClass, AppSidebarComponent, AppTopbarComponent, AppBreadcrumbComponent, RouterOutlet, AppProfileSidebarComponent, AppConfigComponent]
})
export class AppLayoutComponent implements OnDestroy {
    overlayMenuOpenSubscription: Subscription;
    menuOutsideClickListener: any;
    menuScrollListener: any;
    @ViewChild(AppSidebarComponent) appSidebar!: AppSidebarComponent;
    @ViewChild(AppTopbarComponent) appTopbar!: AppTopbarComponent;
    constructor(private menuService: MenuService, public layoutService: LayoutService, public renderer: Renderer2, public router: Router,
        private userService: UserService,
        private treeViewNodeService: TreeViewNodeService,
        private activatedRoute: ActivatedRoute) {
        this.overlayMenuOpenSubscription = this.layoutService.overlayOpen$.subscribe(() => {
            if (!this.menuOutsideClickListener) {
                this.menuOutsideClickListener = this.renderer.listen("document", "click", event => {
                    const isOutsideClicked = !(this.appSidebar.el.nativeElement.isSameNode(event.target) || this.appSidebar.el.nativeElement.contains(event.target)
                        || this.appTopbar.menuButton.nativeElement.isSameNode(event.target) || this.appTopbar.menuButton.nativeElement.contains(event.target));
                    if (isOutsideClicked) {
                        this.hideMenu();
                    }
                });
            }
            if ((this.layoutService.isHorizontal()) && !this.menuScrollListener) {
                this.menuScrollListener = this.renderer.listen(this.appSidebar.menuContainer.nativeElement, "scroll", event => {
                    if (this.layoutService.isDesktop()) {
                        this.hideMenu();
                    }
                });
            }
            if (this.layoutService.state.staticMenuMobileActive) {
                this.blockBodyScroll();
            }
        });
        this.router.events.pipe(filter(event => event instanceof NavigationEnd))
            .subscribe(() => {
                this.hideMenu();
            });
        this.userService.createUser(this.activatedRoute.snapshot.data["user"]);
        this.treeViewNodeService.createTreeViewNode(this.activatedRoute.snapshot.data["treeViewNodeData"]);

    }
    blockBodyScroll(): void {
        if (document.body.classList) {
            document.body.classList.add("blocked-scroll");
        }
        else {
            document.body.className += " blocked-scroll";
        }
    }
    unblockBodyScroll(): void {
        if (document.body.classList) {
            document.body.classList.remove("blocked-scroll");
        }
        else {
            document.body.className = document.body.className.replace(new RegExp("(^|\\b)" +
                "blocked-scroll".split(" ").join("|") + "(\\b|$)", "gi"), " ");
        }
    }
    hideMenu() {
        this.layoutService.state.overlayMenuActive = false;
        this.layoutService.state.staticMenuMobileActive = false;
        this.layoutService.state.menuHoverActive = false;
        this.menuService.reset();
        if (this.menuOutsideClickListener) {
            this.menuOutsideClickListener();
            this.menuOutsideClickListener = null;
        }
        if (this.menuScrollListener) {
            this.menuScrollListener();
            this.menuScrollListener = null;
        }
        this.unblockBodyScroll();
    }
    get containerClass() {
        return {
            "layout-light": this.layoutService.config.colorScheme === "light",
            "layout-dim": this.layoutService.config.colorScheme === "dim",
            "layout-dark": this.layoutService.config.colorScheme === "dark",
            "layout-colorscheme-menu": this.layoutService.config.menuTheme === "colorScheme",
            "layout-primarycolor-menu": this.layoutService.config.menuTheme === "primaryColor",
            "layout-transparent-menu": this.layoutService.config.menuTheme === "transparent",
            "layout-horizontal": this.layoutService.config.menuMode === "horizontal",
            "layout-drawer": this.layoutService.config.menuMode === "drawer",
            "layout-static-inactive": this.layoutService.state.staticMenuDesktopInactive,
            "layout-overlay-active": this.layoutService.state.overlayMenuActive,
            "layout-mobile-active": this.layoutService.state.staticMenuMobileActive,
            "p-input-filled": this.layoutService.config.inputStyle === "filled",
            "layout-sidebar-active": this.layoutService.state.sidebarActive,
            "layout-sidebar-anchored": this.layoutService.state.anchored
        };
    }
    ngOnDestroy() {
        if (this.overlayMenuOpenSubscription) {
            this.overlayMenuOpenSubscription.unsubscribe();
        }
        this.layoutService.hideProfileSidebar();
        if (this.menuOutsideClickListener) {
            this.menuOutsideClickListener();
        }
    }
}
