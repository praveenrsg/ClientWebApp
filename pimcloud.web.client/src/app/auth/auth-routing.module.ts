import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full"
  },
  {
    path: "login",
    loadComponent: () =>
      import("./components/login/login.component").then((x) => x.LoginComponent)
  },
  {
    path: "register",
    loadComponent: () =>
      import("./components/register/register.component").then((x) => x.RegisterComponent)
  },
  {
    path: "forgot-password",
    loadComponent: () =>
      import("./components/forgotpassword/forgotpassword.component").then((x) => x.ForgotPasswordComponent)
  },
  {
    path: "newpassword",
    loadComponent: () =>
      import("./components/newpassword/newpassword.component").then((x) => x.NewPasswordComponent)
  },
  {
    path: "verification",
    loadComponent: () =>
      import("./components/verification/verification.component").then((x) => x.VerificationComponent)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
