import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ProfesorsService} from "../../services/Profesors/profesors.service";
import {RegisterService} from "../../services/Register/register.service";

declare var bootstrap: any;

@Component({
    selector: 'app-verify-otp',
    templateUrl: './verify-otp.component.html',
    styleUrls: ['./verify-otp.component.scss']
})
export class VerifyOtpComponent implements OnInit {
    showSpinner: boolean = false
    message: string = ''
    // @ts-ignore
    formularioCreado: FormGroup;
    email: string = ''

    constructor(private formBuilder: FormBuilder,
                private router: ActivatedRoute,
                private route: Router,
                private PreregisterInjection: RegisterService ) {
    }



    showToastError(errorMessage: string) {
        this.message = errorMessage
        const toastLiveExample = document.getElementById('liveToast')
        const toast = new bootstrap.Toast(toastLiveExample)
        toast.show()
    }

    showToastSuccess(errorMessage: string) {
        this.message = errorMessage
        const toastLiveExample = document.getElementById('liveToastSuccess')
        const toast = new bootstrap.Toast(toastLiveExample)
        toast.show()
    }

    ngOnInit(): void {
        // @ts-ignore
        this.email = localStorage.getItem('userEmail')

        if (this.email == null || this.email == '') {
            this.route.navigate(['/'])
        }

        this.formularioCreado = this.formBuilder.group({
            num_1: ['', Validators.compose([
                Validators.required,
                Validators.minLength(1),
                Validators.maxLength(1)
            ])],
            num_2: ['', Validators.compose([
                Validators.required,
                Validators.minLength(1),
                Validators.maxLength(1)
            ])],
            num_3: ['', Validators.compose([
                Validators.required,
                Validators.minLength(1),
                Validators.maxLength(1)
            ])],
            num_4: ['', Validators.compose([
                Validators.required,
                Validators.minLength(1),
                Validators.maxLength(1)
            ])],
            num_5: ['', Validators.compose([
                Validators.required,
                Validators.minLength(1),
                Validators.maxLength(1)
            ])],
        })
    }

    verificarOTP() {
        console.log(this.formularioCreado.value)
        if (!this.formularioCreado.valid) {
            this.showToastError('No puedes dejar los campos vacios')
        } else {
            this.showSpinner = true
            let val_1 = this.formularioCreado.controls['num_1'].value
            let val_2 = this.formularioCreado.controls['num_2'].value
            let val_3 = this.formularioCreado.controls['num_3'].value
            let val_4 = this.formularioCreado.controls['num_4'].value
            let val_5 = this.formularioCreado.controls['num_5'].value

            let otp = val_1 + val_2 + val_3 + val_4 + val_5

            this.PreregisterInjection.verificarOTP(this.email, otp).subscribe((verifyResponse) => {
                this.showSpinner = false
                if (verifyResponse.code == 200) {
                    this.route.navigate(['/complete/register', verifyResponse.token])
                } else {
                    this.showToastError(verifyResponse.message)
                }
            })
        }
    }

    reenviarCodigo() {
        this.showSpinner = true
        this.PreregisterInjection.reenviarCodigoOTP(this.email).subscribe((resendResponse) => {
            this.showSpinner = false
            if (resendResponse.code == 200) {
                this.showToastSuccess(resendResponse.message)
            } else {
                this.showToastError(resendResponse.message)
            }
        })
    }

}
