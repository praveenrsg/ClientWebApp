import { NgIf } from "@angular/common";
import { Component, DestroyRef, OnDestroy, OnInit, inject } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { ButtonModule } from "primeng/button";
import { InputTextModule } from "primeng/inputtext";
import { MessagesModule } from "primeng/messages";
import { LayoutService } from "src/app/layout/service/app.layout.service";
import { LoginService } from "../../service/login.service";
import { ILoginResponse } from "../../interface/login.interface";
@Component({
	templateUrl: "./login.component.html",
	styleUrls: ["./login.component.scss"],
	standalone: true,
	imports: [RouterLink, FormsModule, ReactiveFormsModule, InputTextModule, NgIf, ButtonModule, MessagesModule]
})
export class LoginComponent implements OnInit, OnDestroy {
	public loading = false;
	public errroMessages!: string;
	public loginForm: FormGroup;
	private destroyRef = inject(DestroyRef);
	mode = "";
	message: string | undefined;
	constructor(
		private layoutService: LayoutService,
		private formBuilder: FormBuilder,
		private loginService: LoginService,
		private router: Router,
		private activeRoute: ActivatedRoute) {
		this.loginForm = this.formBuilder.group({
			email: ["", [Validators.required, Validators.minLength(5)]],
			password: ["", [Validators.required, Validators.minLength(8)]]
		});
	}
	ngOnInit(): void {
		this.mode = this.activeRoute.snapshot.queryParams["mode"];
		if (this.mode === "signup") {
			this.message = "Your account has been successfully activated.Pleae login to continue.";
		} else if (this.mode === "change-password") {
			this.message = "Your password has been successfully	changed.Pleae login to continue.";
		}
	}
	get dark(): boolean {
		return this.layoutService.config.colorScheme !== "light";
	}
	public login(): void {
		if (this.loginForm.valid) {
			this.loading = true;
			this.errroMessages = "";
			const request = this.loginForm.getRawValue();
			this.loginService.login(request).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
				next: (res: ILoginResponse) => {
					this.loading = false;
					if (res.accessToken != null) {
						localStorage.setItem("access_token", res.accessToken);
						localStorage.setItem("userName", request.email);
						this.router.navigate(["/app"]);
					}
				},
				error: ex => {
					console.log(ex)
					this.errroMessages = ex.error.title;
					this.loading = false;
				}
			});
		}
	}
	ngOnDestroy(): void {
		this.message = "";
	}
}
