import { NgIf } from "@angular/common";
import { Component, DestroyRef, inject } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { ButtonModule } from "primeng/button";
import { PasswordModule } from "primeng/password";
import { LayoutService } from "src/app/layout/service/app.layout.service";
import { AppConfigComponent } from "../../../layout/config/app.config.component";
import { AuthService } from "../../service/auth.service";
import { Nullable } from "primeng/ts-helpers";
@Component({
	templateUrl: "./newpassword.component.html",
	standalone: true,
	imports: [PasswordModule, ButtonModule, RouterLink, AppConfigComponent, NgIf]
})
export class NewPasswordComponent {
	rememberMe = false;
	private destroyRef = inject(DestroyRef);
	errroMessages = "";
	loading!: boolean;
	constructor(
		private layoutService: LayoutService,
		private activateRoute: ActivatedRoute,
		private authService: AuthService,
		private router: Router
	) { }

	get dark(): boolean {
		return this.layoutService.config.colorScheme !== "light";
	}
	submit(newPass: any) {
		this.loading = true;
		this.errroMessages = "";
		const payload = {
			token: this.activateRoute.snapshot.queryParams["token"],
			password: newPass
		};
		this.authService.changePassword(payload).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
			this.loading = false;
			this.router.navigate(["/auth/login"], { queryParams: { mode: "change-password" } });
		},
			(ex) => {
				this.loading = false;
				this.errroMessages = ex.error.message;
			}
		);
	}
}
