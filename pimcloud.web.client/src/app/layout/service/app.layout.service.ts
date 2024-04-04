import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
export type MenuMode = "horizontal" | "drawer";
export type ColorScheme = "light" | "dark" | "dim";
export type MenuColorScheme = "colorScheme" | "primaryColor" | "transparent";
export interface AppConfig {
    inputStyle: string;
    colorScheme: ColorScheme;
    theme: string;
    menuMode: MenuMode;
    scale: number;
    menuTheme: MenuColorScheme;
}
interface LayoutState {
    staticMenuDesktopInactive: boolean;
    overlayMenuActive: boolean;
    profileSidebarVisible: boolean;
    configSidebarVisible: boolean;
    staticMenuMobileActive: boolean;
    menuHoverActive: boolean;
    sidebarActive: boolean;
    anchored: boolean,
}
@Injectable({
    providedIn: "root",
})
export class LayoutService {
    config: AppConfig = {
        inputStyle: "outlined",
        menuMode: "drawer",
        colorScheme: "light",
        theme: "indigo",
        scale: 12,
        menuTheme: "colorScheme"
    };
    state: LayoutState = {
        staticMenuDesktopInactive: false,
        overlayMenuActive: false,
        profileSidebarVisible: false,
        configSidebarVisible: false,
        staticMenuMobileActive: false,
        menuHoverActive: false,
        sidebarActive: true,
        anchored: true
    };
    private configUpdate = new Subject<AppConfig>();
    private overlayOpen = new Subject<any>();
    configUpdate$ = this.configUpdate.asObservable();
    overlayOpen$ = this.overlayOpen.asObservable();
    onMenuToggle() {
        if (this.isDesktop()) {
            this.state.staticMenuDesktopInactive = !this.state.staticMenuDesktopInactive;
        }
        else {
            this.state.staticMenuMobileActive = !this.state.staticMenuMobileActive;
            if (this.state.staticMenuMobileActive) {
                this.overlayOpen.next(null);
            }
        }
    }
    onOverlaySubmenuOpen() {
        this.overlayOpen.next(null);
    }
    showProfileSidebar() {
        this.state.profileSidebarVisible = true;
    }
    hideProfileSidebar() {
        this.state.profileSidebarVisible = false;
    }
    showConfigSidebar() {
        this.state.configSidebarVisible = true;
    }
    isDesktop() {
        return window.innerWidth > 991;
    }
    isHorizontal() {
        return this.config.menuMode === "horizontal";
    }
    isMobile() {
        return !this.isDesktop();
    }
    onConfigUpdate() {
        this.configUpdate.next(this.config);
    }
}
