import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { DropdownModule } from "primeng/dropdown";
import { FileUploadModule } from "primeng/fileupload";
import { InputTextareaModule } from "primeng/inputtextarea";
import { TreeViewComponent } from "./view/treeview.component";
import { TreeViewRoutingModule } from "./treeview-routing.module";
import { TableModule } from "primeng/table";
import { TagModule } from "primeng/tag";

@NgModule({
    imports: [
        TreeViewRoutingModule,
        CommonModule,
        FileUploadModule,
        DropdownModule,
        InputTextareaModule,
        TableModule,
        TagModule,
        TreeViewComponent
    ]
})
export class ProfileModule { }
