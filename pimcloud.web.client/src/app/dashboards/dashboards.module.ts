import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ChartModule } from "primeng/chart";
import { InputNumberModule } from "primeng/inputnumber";
import { TableModule } from "primeng/table";
import { TagModule } from "primeng/tag";
import { DashboardRoutingModule } from "./dashboard-routing.module";



@NgModule({
    imports: [
        DashboardRoutingModule,
        CommonModule,
        ChartModule,
        InputNumberModule,
        TableModule,
        TagModule,
    ]
})
export class DashboardsModule { }
