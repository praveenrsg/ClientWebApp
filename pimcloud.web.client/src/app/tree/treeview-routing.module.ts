import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: "",
    redirectTo: "view",
    pathMatch: "full"
  },
  {
    path: "view/:id",
    loadComponent: () =>
      import("./view/treeview.component").then((x) => x.TreeViewComponent)
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TreeViewRoutingModule { }
