import {Component, OnInit} from '@angular/core';
import {AnimationOptions} from "ngx-lottie";
import {AnimationItem} from "lottie-web";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthServiceService} from "../../services/Auth/auth-service.service";

declare var bootstrap: any;

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

    // @ts-ignore
    formularioCreado: FormGroup;
    message: string = ""
    showSpinner: boolean = false
    isPasswordEnabled: boolean = true

    validation_errors: string[] = [
        "Email y/o contraseña incorrectos"
    ]

    options: AnimationOptions = {
        path: '/assets/lottie/code_init.json'
    };

    constructor(private formBuilder: FormBuilder, private router: Router, private AuthInyectado: AuthServiceService) {
    }

    ngOnInit(): void {
        let token = localStorage.getItem('token')
        let isAlumno = localStorage.getItem('isAlumno')

        if ( token != null && isAlumno != null ) {
            this.router.navigate(['/home'])
        }

        this.crearFormulario()

        let success = localStorage.getItem('successRegister')
        if (success != null && success == 'true') {
            this.showToastSuccess('Registro exitoso')
            localStorage.clear()
        }

        let successPassword = localStorage.getItem('successPasswordChange')
        if (successPassword != null && successPassword == 'true') {
            this.showToastSuccess('Cambio de contraseña exitoso')
            localStorage.clear()
        }
    }

    // This is the component function that binds to the animationCreated event from the package
    onAnimate(animationItem: AnimationItem): void {
        console.log(animationItem);
    }

    crearFormulario() {
        this.formularioCreado = this.formBuilder.group({
            email: ['', Validators.compose([
                Validators.required,
                Validators.email
            ])],
            password: ['', Validators.compose([
                Validators.required,
                Validators.minLength(8),
            ])]
        })
    }

    iniciarSesion() {
        if (!this.formularioCreado.valid) {
            this.showToastError()
        } else {
            let regexp = new RegExp('[a-zA-Z0-9]+(@alumno.ipn.mx)')
            let regexpTeacher = new RegExp('[a-zA-Z0-9]+(@ipn.mx)')
            if (!regexp.test(this.formularioCreado.controls['email'].value) &&
                !regexpTeacher.test(this.formularioCreado.controls['email'].value)) {
                this.showToastError()
            } else {
                this.showSpinner = true
                this.isPasswordEnabled = true
                this.AuthInyectado.login(this.formularioCreado.controls['email'].value,
                    this.formularioCreado.controls['password'].value).subscribe((token) => {
                    this.showSpinner = false
                    if (typeof token.message !== 'undefined') {
                        this.showToastError(token.message)
                    } else if (typeof token.access_token === "string") {
                        localStorage.setItem('token', token.access_token)
                        localStorage.setItem('userEmail', this.formularioCreado.controls['email'].value)
                        localStorage.setItem('isAlumno', String(token.isAlumno))
                        this.router.navigate(['/home/'])
                    }
                });
            }
        }
    }

    resetPassword() {
        this.router.navigate(['/forgot/password/', this.formularioCreado.controls['email'].value])
    }

    showToastError(errorMessage?: string) {
        if (typeof errorMessage !== 'undefined') {
            this.message = errorMessage
        } else {
            this.message = this.validation_errors[0]
        }
        const toastLiveExample = document.getElementById('liveToast')
        const toast = new bootstrap.Toast(toastLiveExample)
        toast.show()
    }

    showToastSuccess(successMessage: string) {
        this.message = successMessage
        const toastLiveExample = document.getElementById('liveToastSuccess')
        const toast = new bootstrap.Toast(toastLiveExample)
        toast.show()
    }

    showPassword() {
        this.isPasswordEnabled = !this.isPasswordEnabled
    }

}
