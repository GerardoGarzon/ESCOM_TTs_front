import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';

// Add these two
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';
import { RegisterComponent } from './register/register.component';
import { VerifyOtpComponent } from './verify-otp/verify-otp.component';
import { FinishRegisterComponent } from './finish-register/finish-register.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { RequestNewPasswordComponent } from './request-new-password/request-new-password.component';

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
        RequestNewPasswordComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        // Add the module like so:
        LottieModule.forRoot({ player: playerFactory })
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
