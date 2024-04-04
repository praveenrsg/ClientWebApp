import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { NgIf } from "@angular/common";
import { Subscription } from "rxjs";
import { Component, DestroyRef, inject } from "@angular/core";
import { LayoutService } from "src/app/layout/service/app.layout.service";
import { AppConfigComponent } from "../../../layout/config/app.config.component";
import { ButtonModule } from "primeng/button";
import { InputTextModule } from "primeng/inputtext";
import { AuthService } from "../../service/auth.service";
import { Router, RouterLink } from "@angular/router";
import { MessagesModule } from "primeng/messages";
@Component({
	templateUrl: "./forgotpassword.component.html",
	styleUrls: ["./forgotpassword.component.scss"],
	standalone: true,
	imports: [ButtonModule, AppConfigComponent, InputTextModule, MessagesModule, NgIf, RouterLink]
})
export class ForgotPasswordComponent {
	subscription = new Subscription;
	errroMessages!: string;
	private destroyRef = inject(DestroyRef);
	loading!: boolean;
	constructor(private layoutService: LayoutService, private authService: AuthService, private router: Router) { }
	get dark(): boolean {
		return this.layoutService.config.colorScheme !== "light";
	}
	Submit(email: string) {
		this.loading = true;
		this.errroMessages = "";
		this.authService.forgotPassword(email).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
			this.loading = false;
			this.router.navigate(["/auth/verification"], { queryParams: { email: email } });
		},
			(error) => {
				this.errroMessages = error.error.message;
				this.loading = false;
			}
		);
	}
}
