import { NgIf } from "@angular/common";
import { Component, DestroyRef, OnInit, ViewEncapsulation, inject } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { FormsModule } from "@angular/forms";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { MessageService } from "primeng/api";
import { ButtonModule } from "primeng/button";
import { InputTextModule } from "primeng/inputtext";
import { MessagesModule } from "primeng/messages";
import { LayoutService } from "src/app/layout/service/app.layout.service";
import { AppConfigComponent } from "../../../layout/config/app.config.component";
@Component({
	templateUrl: "./verification.component.html",
	styleUrls: ["./verification.component.scss"],
	standalone: true,
	imports: [FormsModule, ButtonModule, RouterLink, AppConfigComponent, InputTextModule, MessagesModule, NgIf],
	providers: [MessageService],
	encapsulation: ViewEncapsulation.None,
})
export class VerificationComponent implements OnInit {

	message = "";
	email!: string;
	constructor(
		private layoutService: LayoutService,
		private activeRoute: ActivatedRoute,
	) { }
	ngOnInit(): void {
		this.email = this.activeRoute.snapshot.queryParams["email"];
		this.message = `Contact your administrator for password recovery for your Email : <span class="email">${this.email}</span>`;
	}



	get dark(): boolean {
		return this.layoutService.config.colorScheme !== "light";
	}

}
