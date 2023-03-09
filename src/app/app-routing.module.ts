import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {VerifyOtpComponent} from "./verify-otp/verify-otp.component";
import {FinishRegisterComponent} from "./finish-register/finish-register.component";
import {InactiveAccountComponent} from "./inactive-account/inactive-account.component";
import {RequestNewPasswordComponent} from "./request-new-password/request-new-password.component";
import {NotFoundPageComponent} from "./not-found-page/not-found-page.component";
import {ChangePasswordComponent} from "./change-password/change-password.component";
import {HomeComponent} from "./home/home.component";
import {PasswrodResetEmailComponent} from "./passwrod-reset-email/passwrod-reset-email.component";
import {ProfesorHomeComponent} from "./home/profesor-home/profesor-home.component";
import {StudentHomeComponent} from "./home/student-home/student-home.component";
import {ProfesorDetailComponent} from "./home/profesor-detail/profesor-detail.component";
import {TrabajoDetailComponent} from "./home/trabajo-detail/trabajo-detail.component";
import {ActivateAccountComponent} from "./home/activate-account/activate-account.component";

const routes: Routes = [
    {
        path: '',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'verify/otp',
        component: VerifyOtpComponent
    },
    {
        path: 'complete/register/:token',
        component: FinishRegisterComponent
    },
    {
        path: 'inactive/account',
        component: InactiveAccountComponent
    },
    {
        path: 'forgot/password/:email',
        component: RequestNewPasswordComponent
    },
    {
        path: 'change/password',
        component: ChangePasswordComponent
    },
    {
        path: 'home',
        component: HomeComponent,
        children: [
            {
                path: 'profesor',
                component: StudentHomeComponent
            },
            {
                path: 'alumno',
                component: StudentHomeComponent
            },
            {
                path: 'profesor/detail/:id',
                component: ProfesorDetailComponent
            },
            {
                path: 'trabajo/detail/:id',
                component: TrabajoDetailComponent
            },
            {
                path: 'activar/alumno',
                component: ActivateAccountComponent
            }
        ]
    },
    {
        path: 'password/reset/sent',
        component: PasswrodResetEmailComponent
    },
    {
        path: '**',
        component: NotFoundPageComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
