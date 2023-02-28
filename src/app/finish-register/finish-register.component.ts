import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {RegisterService} from "../../services/Register/register.service";
import {FinishRegisterResponse} from "../../services/Responses/FinishRegisterResponse";

declare var bootstrap: any;

@Component({
    selector: 'app-finish-register',
    templateUrl: './finish-register.component.html',
    styleUrls: ['./finish-register.component.scss']
})

export class FinishRegisterComponent implements OnInit{
    // @ts-ignore
    formularioCreado: FormGroup;
    message: string = ''
    token: string = ''
    // @ts-ignore
    userType: string | null
    isAlumno: boolean = true
    email: string = ''
    showSpinner: boolean = false

    constructor(private formBuilder: FormBuilder,
                private router: ActivatedRoute,
                private route: Router,
                private PreregisterInjection: RegisterService ) {
    }

    ngOnInit(): void {
        // @ts-ignore
        this.email = localStorage.getItem('userEmail')
        // @ts-ignore
        this.token = this.router.snapshot.params['token']
        this.userType = localStorage.getItem('userType')

        if (this.token == null || this.token == '') {
            this.route.navigate(['/'])
        }

        if (this.userType == null || this.userType == '') {
            this.route.navigate(['/'])
        }

        if (this.email == null || this.email == '') {
            this.route.navigate(['/'])
        }

        if (this.userType == 'true') {
            this.isAlumno = true
        } else if (this.userType == 'false') {
            this.isAlumno = false
        } else {
            this.route.navigate(['/'])
        }

        this.formularioCreado = this.formBuilder.group({
            nombre: ['', Validators.compose([
                Validators.required
            ])],
            telefono: ['', Validators.compose([
                Validators.required
            ])],
            boleta: ['', Validators.compose([
                Validators.minLength(10),
                Validators.maxLength(10)
            ])]
        })
    }

    showToastError(errorMessage: string) {
        this.message = errorMessage
        const toastLiveExample = document.getElementById('liveToast')
        const toast = new bootstrap.Toast(toastLiveExample)
        toast.show()
    }

    completarRegistro() {
        console.log(this.formularioCreado.value)
        if (!this.formularioCreado.valid) {
            this.showToastError('Campos invalidos')
        } else {
            this.showSpinner = true
            let nombre = this.formularioCreado.controls['nombre'].value
            let telefono = this.formularioCreado.controls['telefono'].value
            let boleta = this.formularioCreado.controls['boleta'].value

            console.log(nombre, telefono, boleta, this.email, this.token)
            localStorage.clear()

            this.PreregisterInjection.completarRegistro(this.email, nombre, this.token, telefono, boleta).subscribe((finishRegisterResponse) => {
                this.showSpinner = false
                if (finishRegisterResponse.code == 200) {
                    this.route.navigate(['/inactive/account'])
                } else if (finishRegisterResponse.code == 201) {
                    localStorage.setItem('successRegister', 'true')
                    this.route.navigate(['/'])
                } else {
                    this.showToastError(finishRegisterResponse.message)
                }
            })
        }
    }

}
