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
import { HomeComponent } from './home/home.component';

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
        HomeComponent
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
