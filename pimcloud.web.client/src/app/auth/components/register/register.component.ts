import { NgIf } from "@angular/common";
import { Component, DestroyRef, OnInit, inject } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";
import { Router, RouterLink } from "@angular/router";
import { MenuItem, Message } from "primeng/api";
import { ButtonModule } from "primeng/button";
import { InputTextModule } from "primeng/inputtext";
import { MessagesModule } from "primeng/messages";
import { PasswordModule } from "primeng/password";
import { LayoutService } from "src/app/layout/service/app.layout.service";
import { IGioLocation, IRegister, IRegisterResponse } from "../../interface/register.interface";
import { RegisterService } from "../../service/regiter.service";
@Component({
	templateUrl: "./register.component.html",
	standalone: true,
	imports: [NgIf, FormsModule, ReactiveFormsModule, InputTextModule, PasswordModule, ButtonModule, RouterLink, MessagesModule]
})
export class RegisterComponent implements OnInit {
	items: MenuItem[] | undefined;
	registerStatus = true;
	isChecked = true;
	loading = false;
	errroMessages: Message[] = [];
	public registerForm: FormGroup;
	private destroyRef = inject(DestroyRef);
	customValidator = Validators.pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/);
	constructor(
		private layoutService: LayoutService,
		private formBuilder: FormBuilder,
		private registerService: RegisterService,
		private router: Router
	) {
		this.registerForm = this.formBuilder.group({
			email: ["", [Validators.required, Validators.minLength(5), Validators.email]],
			password: ["", [Validators.required, this.customValidator]],
			confirmPassword: ["", [Validators.required, Validators.minLength(8)]],
			isChecked: new FormControl({ value: true, disabled: true }),
		});
		this.registerForm.setValidators(this.confirmPasswordValidator());
	}
	ngOnInit(): void {
		this.registerStatus = false;
	}
	get dark(): boolean {
		return this.layoutService.config.colorScheme !== "light";
	}
	public register(): void {
		if (this.registerForm.valid) {
			this.loading = true;
			this.errroMessages = [];
			const request: IRegister = this.registerForm.getRawValue();
			delete request.confirmPassword;
			this.registerService.register(request).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
				next: () => {
					this.loading = false;
					this.registerStatus = true;
				},
				error: ex => {
					console.log(ex)
					let errorMsg = ex.error?.title;
					switch (ex.status) {
						case 500:
							errorMsg = "Something went wrong please try again later.";
							break;
					}
					this.errroMessages = [
						{ severity: "error", summary: "Error", detail: errorMsg },
					];
					this.loading = false;
					this.registerStatus = false;
				}
			});
		}
	}

	confirmPasswordValidator(): ValidatorFn {
		return (control: AbstractControl): ValidationErrors | null => {
			return control.value.password === control.value.confirmPassword ? null : { passwordDoNotMatch: true };
		};
	}
}
