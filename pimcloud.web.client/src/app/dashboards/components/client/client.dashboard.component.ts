import { CurrencyPipe, DatePipe, NgClass, NgFor, NgIf } from "@angular/common";
import { Component, DestroyRef, OnDestroy, OnInit, inject } from "@angular/core";
import { Router } from "@angular/router";
import { SharedModule } from "primeng/api";
import { ButtonModule } from "primeng/button";
import { ChartModule } from "primeng/chart";
import { TableModule } from "primeng/table";
import { TagModule } from "primeng/tag";
import { TooltipModule } from "primeng/tooltip";
import { Subscription } from "rxjs";
import { LayoutService } from "src/app/layout/service/app.layout.service";

@Component({
	templateUrl: "./client.dashboard.component.html",
	standalone: true,
	imports: [ChartModule, ButtonModule, NgFor, TooltipModule, NgClass, TableModule, SharedModule, NgIf, TagModule, CurrencyPipe, DatePipe]
})
export class ClientDashboardComponent implements OnInit, OnDestroy {
	subscription: Subscription;
	lastLoginDateTime = "";
	userName:string="";
	constructor(private layoutService: LayoutService,
	) {
		this.subscription = this.layoutService.configUpdate$.subscribe(config => {
			console.log('config>>', config)
		});
	}

	ngOnInit() {
		const now = new Date();
		this.lastLoginDateTime = now.toLocaleString();
		this.userName = localStorage.getItem("userName") || "";
	}


	ngOnDestroy(): void {
		if (this.subscription) {
			this.subscription.unsubscribe();
		}
	}

}
