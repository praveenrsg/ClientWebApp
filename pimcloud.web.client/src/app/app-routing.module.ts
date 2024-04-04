import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { UserDataResolve } from "./shared/services/user.resolve";
import { TreeViewNodeDataResolve } from "./shared/services/treeViewNode.resolve";
import { AppLayoutComponent } from "./layout/app.layout.component";
export const routes: Routes = [
  {
    path: "",
    redirectTo: "auth",
    pathMatch: "full"
  },
  {
    path: "auth",
    loadChildren: () => import("./auth/auth.module").then(m => m.AuthModule)
  },
  {
    path: "app",
    component: AppLayoutComponent,
    resolve: {
      // user: UserDataResolve,
      treeViewNodeData: TreeViewNodeDataResolve
    },
    children: [
      {
        path: "",
        redirectTo: "dashboard",
        pathMatch: "full"
      },
      {
        path: "dashboard",
        loadChildren: () => import("./dashboards/dashboards.module").then(m => m.DashboardsModule)
      },
      {
        path: "tree",
        loadChildren: () => import("./tree/treeview.module").then(m => m.ProfileModule)
      },
      {
        path: "subuser",
        loadChildren: () => import("./subuser/subuser.module").then(m => m.SubuserListModule)
      }
    ]
  },
  {
    path: "**",
    redirectTo: "auth"
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
