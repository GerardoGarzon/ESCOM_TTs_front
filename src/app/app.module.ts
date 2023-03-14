import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {LottieModule} from 'ngx-lottie';
import {RegisterComponent} from './register/register.component';
import {VerifyOtpComponent} from './verify-otp/verify-otp.component';
import {FinishRegisterComponent} from './finish-register/finish-register.component';
import {ChangePasswordComponent} from './change-password/change-password.component';
import {RequestNewPasswordComponent} from './request-new-password/request-new-password.component';
import {InactiveAccountComponent} from './inactive-account/inactive-account.component';
import {NotFoundPageComponent} from './not-found-page/not-found-page.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {HomeComponent} from './home/home.component';
import {PasswrodResetEmailComponent} from './passwrod-reset-email/passwrod-reset-email.component';
import { ProfesorHomeComponent } from './home/profesor-home/profesor-home.component';
import { StudentHomeComponent } from './home/student-home/student-home.component';
import { ProfesorDetailComponent } from './home/profesor-detail/profesor-detail.component';
import { TrabajoDetailComponent } from './home/trabajo-detail/trabajo-detail.component';
import { TrabajoCardComponent } from './home/trabajo-card/trabajo-card.component';
import { ActivateAccountComponent } from './home/activate-account/activate-account.component';
import { ProfileComponent } from './home/profile/profile.component';
import { CreateTrabajoComponent } from './home/create-trabajo/create-trabajo.component';
import { EditTrabajoComponent } from './home/edit-trabajo/edit-trabajo.component';
import { AddStudentTrabajoComponent } from './home/add-student-trabajo/add-student-trabajo.component';
import { UpdateTrabajoComponent } from './home/update-trabajo/update-trabajo.component';

// Export this function
export function playerFactory(): any {
    return import('lottie-web');
}


@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        RegisterComponent,
        VerifyOtpComponent,
        FinishRegisterComponent,
        ChangePasswordComponent,
        RequestNewPasswordComponent,
        InactiveAccountComponent,
        NotFoundPageComponent,
        HomeComponent,
        PasswrodResetEmailComponent,
        ProfesorHomeComponent,
        StudentHomeComponent,
        ProfesorDetailComponent,
        TrabajoDetailComponent,
        TrabajoCardComponent,
        ActivateAccountComponent,
        ProfileComponent,
        CreateTrabajoComponent,
        EditTrabajoComponent,
        AddStudentTrabajoComponent,
        UpdateTrabajoComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        // Add the module like so:
        LottieModule.forRoot({player: playerFactory}),
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
