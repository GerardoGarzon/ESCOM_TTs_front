import {Component, OnInit, ViewChild} from '@angular/core';
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
    // @ts-ignore
    @ViewChild('num1') input_1
    // @ts-ignore
    @ViewChild('num2') input_2
    // @ts-ignore
    @ViewChild('num3') input_3
    // @ts-ignore
    @ViewChild('num4') input_4
    // @ts-ignore
    @ViewChild('num5') input_5
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

    inputFill(inputID: number) {
        switch (inputID) {
            case 1:
                if (this.formularioCreado.controls['num_1'].value.length == 1) {
                    this.input_2.nativeElement.focus()
                }
                break
            case 2:
                if (this.formularioCreado.controls['num_2'].value.length == 1) {
                    this.input_3.nativeElement.focus()
                }
                break
            case 3:
                if (this.formularioCreado.controls['num_3'].value.length == 1) {
                    this.input_4.nativeElement.focus()
                }
                break
            case 4:
                if (this.formularioCreado.controls['num_4'].value.length == 1) {
                    this.input_5.nativeElement.focus()
                }
                break
            case 5:
                break
        }
    }

}
