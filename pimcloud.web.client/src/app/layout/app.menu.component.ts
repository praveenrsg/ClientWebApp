import { OnInit } from "@angular/core";
import { Component } from "@angular/core";
import { AppMenuitemComponent } from "./app.menuitem.component";
import { NgFor } from "@angular/common";
import { TreeViewNodeService } from "../shared/services/treeViewNode.service";
import { ITreeViewNodeNew } from "../tree/view/treenode.interface";

@Component({
	selector: "app-menu",
	templateUrl: "./app.menu.component.html",
	standalone: true,
	imports: [NgFor, AppMenuitemComponent]
})
export class AppMenuComponent implements OnInit {

	model: any[] = [];
	treeViewNodeDetail: ITreeViewNodeNew[] = [];
	constructor(private treeViewNodeService: TreeViewNodeService) { }
	ngOnInit() {
		this.treeViewNodeDetail = this.treeViewNodeService?.treeViewNodeDetail;
		const treeNodesItems = this.createMenuModelNew();
		this.model = [
			{
				//label: "Super Admin",
				icon: "pi pi-th-large",
				items: [
					{
						label: "Home",
						icon: "pi pi-fw pi-home",
						routerLink: ["/app/dashboard/client"]
					},
					{
						label: "PIM Tree View",
						icon: "pi pi-fw pi-list",
						items: treeNodesItems,
					},

					{
						label: 'Settings',
						icon: 'pi pi-fw pi-cog',
						items: [
							{
								label: 'User Management',
								icon: 'pi pi-fw pi-user',
								items: [
									{
										label: 'Create',
										icon: "pi pi-fw pi-plus",
										routerLink: ["subuser/create-subuser"]
									},
									{
										label: 'List',
										icon: "pi pi-fw pi-list",
										routerLink: ["subuser/list-subuser"]
									}
								]
							},
							{
								label: 'Products',
								icon: 'pi pi-fw pi-image',
							}
						]
					}
				]
			},
		];
	}


	createMenuModelNew() {
		let menuItems: any = [];
		// Iterate through each object in the JSON data
		this.treeViewNodeDetail.forEach(item => {
			let menuItem = {
				label: item.Name,
				icon: "pi pi-fw pi-box",
				items: [] as { label: string; icon?: string; routerLink: string[] }[]
			};

			// Iterate through each detail in the object
			item.Details.forEach(detail => {
				let subMenuItem = {
					label: detail.Name,
					icon: "pi pi-fw pi-tags",
					routerLink: [`/app/tree/view/` + detail.ObjectDetailId] // Assuming routerLink follows a specific pattern
				};

				menuItem.items.push(subMenuItem);
			});

			menuItems.push(menuItem);
		});

		return menuItems;
	}
}
