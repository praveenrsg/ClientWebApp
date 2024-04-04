import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SubUserRoutingModule } from "./subuser-routing.module";
import { SubUserListComponent } from "./list-subuser/list-subuser.component";

import { RippleModule } from "primeng/ripple";
import { ButtonModule } from "primeng/button";
import { InputTextModule } from "primeng/inputtext";
import { TableModule } from "primeng/table";
import { TagModule } from "primeng/tag";
import { MessagesModule } from "primeng/messages";
import { ProgressBarModule } from "primeng/progressbar";
import { SplitButtonModule } from "primeng/splitbutton";
import { EditorModule } from "primeng/editor";
import { MenuModule } from "primeng/menu";
import { DialogModule } from "primeng/dialog";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { SubuserCreateComponent } from "./create-subuser/create-subuser.component";

@NgModule({
    imports: [
        SubUserRoutingModule,
        CommonModule,
        RippleModule,
        ButtonModule,
        InputTextModule,
        TableModule,
        TagModule,
        ProgressBarModule,
        MessagesModule,
        SplitButtonModule,
        EditorModule,
        MenuModule,
        DialogModule,
        ConfirmDialogModule,
        SubUserListComponent,
        SubuserCreateComponent
    ]
})
export class SubuserListModule { }