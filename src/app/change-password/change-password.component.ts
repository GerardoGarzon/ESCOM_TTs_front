import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PasswordResetService} from "../../services/PasswordReset/password-reset.service";

declare var bootstrap: any;

@Component({
    selector: 'app-change-password',
    templateUrl: './change-password.component.html',
    styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

    // @ts-ignore
    message: string
    // @ts-ignore
    token: string;
    // @ts-ignore
    formularioCreado: FormGroup
    showSpinner: boolean = false
    isPasswordEnabled: boolean = true
    isPasswordEnabled2: boolean = true

    constructor(private route: ActivatedRoute,
                private router: Router,
                private formBuilder: FormBuilder,
                private PasswordInjection: PasswordResetService ) { }

    ngOnInit(): void {
        this.route.queryParams.subscribe(params => {
            console.log(params);
            this.token = params['token'];

            if (this.token === undefined) {
                this.router.navigate(['/'])
            }
        })

        this.formularioCreado = this.formBuilder.group({
            email:['', Validators.compose([
                Validators.required,
                Validators.minLength(8)
            ])],
            new_password:['', Validators.compose([
                Validators.required,
                Validators.minLength(8)
            ])],
            new_password_confirm:['', Validators.compose([
                Validators.required,
                Validators.minLength(8)
            ])],
        })
    }

    cambiarContrasena() {
        if (!this.formularioCreado.valid) {
            this.showToastError('Contraseña no valida')
        } else {
            let email = this.formularioCreado.controls['email'].value
            let password = this.formularioCreado.controls['new_password'].value
            let passwordConfirm = this.formularioCreado.controls['new_password_confirm'].value

            if (password === passwordConfirm) {
                this.showSpinner = true
                this.PasswordInjection.cambiarContrasena(this.token, password, email).subscribe((response) => {
                    this.showSpinner = false
                    if (response.code == 200) {
                        localStorage.setItem('successPasswordChange', 'true')
                        this.router.navigate(['/'])
                    } else {
                        this.showToastError('Ocurrio un error, intentalo nuevamente')
                    }
                })

            } else {
                this.showToastError('Las contraseñas deben ser iguales')
            }
        }
    }

    showToastError(errorMessage: string) {
        this.message = errorMessage
        const toastLiveExample = document.getElementById('liveToast')
        const toast = new bootstrap.Toast(toastLiveExample)
        toast.show()
    }

    showPassword() {
        this.isPasswordEnabled = !this.isPasswordEnabled
    }

    showPassword2() {
        this.isPasswordEnabled2 = !this.isPasswordEnabled2
    }

}
