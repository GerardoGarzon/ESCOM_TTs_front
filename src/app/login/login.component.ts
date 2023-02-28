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

    validation_errors: string[] = [
        "Email y/o contraseña incorrectos"
    ]

    options: AnimationOptions = {
        path: '/assets/lottie/code_init.json'
    };

    constructor(private formBuilder: FormBuilder, private router: Router, private AuthInyectado: AuthServiceService) {
    }

    ngOnInit(): void {
        this.crearFormulario()
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
            if (!regexp.test(this.formularioCreado.controls['email'].value)) {
                this.showToastError()
            } else {
                this.showSpinner = true
                this.AuthInyectado.login(this.formularioCreado.controls['email'].value,
                    this.formularioCreado.controls['password'].value).subscribe((token) => {
                    this.showSpinner = false
                    if (typeof token.message !== 'undefined') {
                        this.showToastError(token.message)
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

}
