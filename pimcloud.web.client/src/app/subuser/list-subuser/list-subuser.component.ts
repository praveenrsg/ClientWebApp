import { Component, DestroyRef, OnInit, ViewChild, inject } from "@angular/core";
import { UserDetailsService } from "../service/subuser.service";
import { IUserDetails } from "../interface/subuser.interface";
import { Table, TableModule } from "primeng/table";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { CurrencyPipe, DatePipe, NgClass, NgIf } from "@angular/common";
import { InputTextModule } from "primeng/inputtext";
import { SharedModule } from "primeng/api";
import { FormGroup, ReactiveFormsModule } from "@angular/forms";
import { MessageService, ConfirmationService, Message, MenuItem } from "primeng/api";
import { Menu } from "primeng/menu";
import { DialogModule } from "primeng/dialog";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { DropdownModule } from "primeng/dropdown";
import { MessageModule } from "primeng/message";
import { MessagesModule } from "primeng/messages";
import { ToastModule } from "primeng/toast";
import { TagModule } from "primeng/tag";
import { MenuModule } from "primeng/menu";
import { Router } from "@angular/router";
import { ConfirmPopupModule } from "primeng/confirmpopup";


@Component({
  selector: "app-list-subuser",
  templateUrl: "./list-subuser.component.html",
  styleUrls: ["./list-subuser.component.scss"],
  standalone: true,
  providers: [MessageService, ConfirmationService],
  imports: [
    TableModule,
    SharedModule,
    InputTextModule,
    CurrencyPipe,
    DatePipe,
    DialogModule,
    ConfirmDialogModule,
    DropdownModule,
    ReactiveFormsModule,
    MessageModule,
    MessagesModule,
    ToastModule,
    TagModule,
    MenuModule,
    NgIf, NgClass,
    ConfirmPopupModule,
  ]
})
export class SubUserListComponent implements OnInit {

  public userRecors: IUserDetails[];
  public deletedUserId!: number;
  public inviteSubuserForm!: FormGroup;
  private selectedUserItem!: IUserDetails;
  private destroyRef = inject(DestroyRef);
  @ViewChild("menu") menu!: Menu;

  @ViewChild("dt")
  table!: Table;
  public msgs: Message[] = [];
  public items!: MenuItem[];
  public loader = true;

  public menuItems: MenuItem[] = [];
  constructor(
    private subuserDetails: UserDetailsService,
    private confirmationDialog: ConfirmationService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService

  ) {
    this.userRecors = [];
  }
  ngOnInit(): void {
    this.getAllSubUserDetails();
    this.menuItems = [
      { label: "Edit", icon: "pi pi-pencil", command: (event) => { this.editUser(); } },
      { label: "Delete", icon: "pi pi-trash", command: () => { this.deleteUser(this.selectedUserItem); } },
    ];
  }
  public toggleMenu(event: Event, user: IUserDetails) {
    this.menu.toggle(event);
    this.selectedUserItem = user;
  }
  public getAllSubUserDetails(): void {
    this.subuserDetails.getAllSubUserDetails().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (result) => {
        if (result) {
          this.loader = false;
          this.userRecors = result;
        }
      },
      error: error => {
        this.messageService.add({ severity: "error", summary: "error", detail: "Error While Fetching Date !!" });
      }
    });
  }
  public reinviteSubuser(userRecord: any) {
    const payload = {
      id: userRecord.id
    };
    this.subuserDetails.reinviteSubuser(payload).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (result) => {
        if (result) {
          this.messageService.add({ severity: "success", summary: "Success", detail: result.message });
        }
      }
    });
  }

  public deleteUser(userRecord: any) {
    this.confirmationDialog.confirm({
      message: "Are you sure want to delete user:" + userRecord.email + "?",
      icon: "pi pi-exclamation-triangle",
      accept: (data: any) => {
        const payload = {
          id: userRecord.id
        };
        this.subuserDetails.deleteSubuser(payload).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
          next: (result) => {
            const index = this.userRecors.findIndex(x => x.id === userRecord.id);
            this.userRecors.splice(index, 1);
            if (result) { this.messageService.add({ severity: "success", summary: "Success", detail: result.message }); }
            else { this.messageService.add({ severity: "error", summary: "Some went wrong", detail: "" }); }
          }
        });
      },
      reject: () => { },
      key: "dialogPos",
    });
  }

  public editUser(): void {
    this.subuserDetails.setSelectedItem(this.selectedUserItem);
    this.router.navigate(["app/subuser/create-subuser"]);
  }
  public onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, "contains");
  }
  public navigateToCreateUser(): void {
    const newEmptyUserModal: IUserDetails = {
      id: 0,
      name: "",
      email: "",
      mobileNumber: "",
      countryCode: "",
      accesses: [],
      createdAt: "",
      editedAt: "",
      status: [],
      role: [],
      fileUpload: ""
    };

    this.subuserDetails.setSelectedItem(newEmptyUserModal);
    this.router.navigate(["app/subuser/create-subuser"]);
  }

}




