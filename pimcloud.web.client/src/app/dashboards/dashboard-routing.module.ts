import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: "",
    redirectTo: "client",
    pathMatch: "full"
  },
  {
    path: "client",
    loadComponent: () =>
      import("./components/client/client.dashboard.component").then((x) => x.ClientDashboardComponent)
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
