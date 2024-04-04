import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

export const routes: Routes = [
	{
		path: "list-subuser", loadComponent: () =>
			import("./list-subuser/list-subuser.component").then((x) => x.SubUserListComponent)
	},
	{ path: "create-subuser", loadComponent: () => import("./create-subuser/create-subuser.component").then(m => m.SubuserCreateComponent) },
];
@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class SubUserRoutingModule { }
