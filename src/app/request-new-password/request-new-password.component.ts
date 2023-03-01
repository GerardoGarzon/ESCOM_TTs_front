import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PasswordResetService} from "../../services/PasswordReset/password-reset.service";

declare var bootstrap: any;

@Component({
    selector: 'app-request-new-password',
    templateUrl: './request-new-password.component.html',
    styleUrls: ['./request-new-password.component.scss']
})
export class RequestNewPasswordComponent implements OnInit {
    email: string = ''
    // @ts-ignore
    formularioCreado: FormGroup
    message: string = ''
    showSpinner: boolean = false

    constructor(private route: ActivatedRoute,
                private formBuilder: FormBuilder,
                private PasswordInjection: PasswordResetService,
                private router: Router) {
    }

    ngOnInit(): void {
        this.email = this.route.snapshot.params['email']

        this.formularioCreado = this.formBuilder.group({
            email: [this.email, Validators.compose([
                Validators.required
            ])]
        })
    }

    solicitarCambioContrasena() {
        if (!this.formularioCreado.valid) {
            this.showToastError('Correo institucional invalido')
        } else {
            this.showSpinner = true
            this.PasswordInjection.solicitarCambioContrasena(this.email).subscribe((forgotPasswordResponse) => {
                this.showSpinner = false
                if (forgotPasswordResponse.code == 200) {
                    this.router.navigate(['/password/reset/sent'])
                } else {
                    this.showToastError(forgotPasswordResponse.message)
                }
            })
        }
    }

    showToastError(errorMessage: string) {
        this.message = errorMessage
        const toastLiveExample = document.getElementById('liveToast')
        const toast = new bootstrap.Toast(toastLiveExample)
        toast.show()
    }


}
