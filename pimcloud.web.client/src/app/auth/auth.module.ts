import { NgModule } from "@angular/core";
import { AuthRoutingModule } from "./auth-routing.module";
import { ForgotPasswordComponent } from "./components/forgotpassword/forgotpassword.component";
import { LoginComponent } from "./components/login/login.component";
import { NewPasswordComponent } from "./components/newpassword/newpassword.component";
import { RegisterComponent } from "./components/register/register.component";
import { VerificationComponent } from "./components/verification/verification.component";
@NgModule({
    imports: [
        AuthRoutingModule,
        ForgotPasswordComponent, LoginComponent, NewPasswordComponent, RegisterComponent, VerificationComponent,
    ]
})
export class AuthModule { }
