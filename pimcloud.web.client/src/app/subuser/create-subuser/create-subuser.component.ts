import { Component, OnInit, DestroyRef, inject, ViewChild } from "@angular/core";
import { Message, MessageService, SelectItem } from "primeng/api";
import { UserDetailsService } from "../service/subuser.service";
import { Countries, IUserDetails, DialCode, IUserInviteSuccessResponse } from "../interface/subuser.interface";
import { CommonModule, Location } from "@angular/common";
import { RippleModule } from "primeng/ripple";
import { ButtonModule } from "primeng/button";
import { InputTextModule } from "primeng/inputtext";
import { DropdownModule } from "primeng/dropdown";
import { FileUpload, FileUploadModule } from "primeng/fileupload";
import { InputTextareaModule } from "primeng/inputtextarea";
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { ToastModule } from "primeng/toast";
import { countries } from "../interface/country-data";
import { dialCode } from "../interface/dial-code";

@Component({
    selector: "app-create-subuser",
    templateUrl: "./create-subuser.component.html",
    standalone: true,
    providers: [MessageService],
    imports: [
        CommonModule,
        ButtonModule,
        RippleModule,
        InputTextModule,
        DropdownModule,
        FileUploadModule,
        InputTextareaModule,
        ReactiveFormsModule,
        ToastModule,
    ]
})
export class SubuserCreateComponent implements OnInit {
    private destroyRef = inject(DestroyRef);
    public inviteSubuserForm: FormGroup;
    public userRecors: IUserDetails[];
    public addUserDialogShowflag = false;
    public rolesPermission: SelectItem[] = [];
    public loading = false;
    public countries: Countries[] = countries;
    public dialCode: DialCode[] = dialCode;
    public uploadedFiles: any[] = [];
    @ViewChild("fileUpload") fileUpload!: FileUpload;


    constructor(
        private formBuilder: FormBuilder,
        private subuserDetails: UserDetailsService,
        private router: Router,
        private messageService: MessageService,
        private location: Location
    ) {
        this.userRecors = [];
        this.inviteSubuserForm = this.formBuilder.group({
            email: ["", [Validators.required, Validators.email]],
            role: ["", [Validators.required]],
            id: [0],
            mobileNumber: ["", [Validators.required, Validators.minLength(10)]],
            firstName: ["", [Validators.required]],
            lastName: ["", [Validators.required]],
            country: ["", [Validators.required]],
            countryCode: ["", [Validators.required]],
            fileUpload: [""]
        });
    }
    ngOnInit(): void {
        this.getAllRoles();

        this.subuserDetails.selectedItem$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(item => {
            if (item.id > 0) {
                this.inviteSubuserForm.patchValue(item);
            }
        });
    }

    public goBack(): void {
        this.subuserDetails.setSelectedItem(null);
        this.location.back();
    }
    public inviteSubuser(): void {
        if (this.inviteSubuserForm.valid) {
            this.loading = true;
            const formData = this.inviteSubuserForm.getRawValue();
            const request = {
                email: formData.email,
                role: formData.role,
                id: formData.id,
                firstName: formData.firstName,
                lastName: formData.lastName,
                mobileNumber: formData.mobileNumber,
                country: formData.country.name,
                countryCode: formData.countryCode.isdCode,
                fileUpload: formData.fileUpload

            };
            this.subuserDetails.inviteUser(request).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
                next: (res: IUserInviteSuccessResponse) => {
                    this.loading = false;
                    this.messageService.add({ severity: "success", summary: "success", detail: res.message });
                    setTimeout(() => {
                        this.router.navigate(["app/subuser/list-subuser"]);
                    }, 2000);

                },
                error: error => {
                    this.loading = false;
                    this.messageService.add({ severity: "error", summary: "error", detail: error.error.message });
                }
            });
        }
    }

    public getAllRoles(): void {
        this.subuserDetails.getUserRolePermission().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
            next: (result) => {
                result.forEach((data: { roleName: any; }) => {

                    if (data.roleName == 'CITI_POLL_ADMIN') data.roleName = " CITIPOLL ADMIN"
                    this.rolesPermission.push({ label: data.roleName == 'SUPER_ADMIN' ? 'SUPER ADMIN' : data.roleName, value: data.roleName });

                });
                this.subuserDetails.selectedItem$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(item => {
                    if (item.id > 0) {
                        this.inviteSubuserForm.patchValue(item);
                    }
                });
            }
        });
    }
    public uploadfun(event: any) {
        this.blobToBase64(event.currentFiles[0]).then(base64 => {
            this.inviteSubuserForm.patchValue({ fileUpload: base64 });
        });
    }

    public blobToBase64(blob: Blob) {
        return new Promise((resolve, _) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.readAsDataURL(blob);
        });
    }

}

