import {Component, OnInit} from '@angular/core';
import {ProfesorsService} from "../../services/Profesors/profesors.service";
import {Profesor} from "../../models/profesor";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {RegisterService} from "../../services/Register/register.service";

declare var bootstrap: any;

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
    profesores: Array<Profesor> = new Array<Profesor>()
    showSpinner: boolean = false
    isAlumno: boolean = true
    // @ts-ignore
    formularioCreado: FormGroup
    validation_errors: string[] = [
        'Debes seleccionar un profesor'
    ]
    message: string = ''
    isPasswordEnabled: boolean = true
    constructor(private formBuilder: FormBuilder,
                private router: Router,
                private ProfesorsInjection: ProfesorsService,
                private PreregisterInjection: RegisterService ) {
    }

    ngOnInit(): void {
        this.showSpinner = true
        this.ProfesorsInjection.leerProfesores().subscribe((profesoresAPI) => {
            this.profesores = profesoresAPI.data
            this.showSpinner = false
        })
        this.createFormulario()
    }

    createFormulario() {
        this.formularioCreado = this.formBuilder.group({
            email: ['', Validators.compose([
                Validators.required,
                Validators.email
            ])],
            password: ['', Validators.compose([
                Validators.required,
                Validators.minLength(8),
            ])],
            isAlumno: [true, Validators.compose([
                Validators.required
            ])],
            profesorId: [ '-1', Validators.compose([
            ])]
        })
    }

    createPreregister() {
        console.log(this.formularioCreado.value)
        if (!this.formularioCreado.valid) {
            this.showToastError('No puedes dejar los campos vacios')
        } else {
            let regexp = new RegExp('[a-zA-Z0-9]+(@alumno.ipn.mx)')
            let regexpTeacher = new RegExp('[a-zA-Z0-9]+(@ipn.mx)')

            if (!regexp.test(this.formularioCreado.controls['email'].value) &&
                !regexpTeacher.test(this.formularioCreado.controls['email'].value)) {

                this.showToastError('Correo invalido, debes ingresar tu correo institucional')
            } else if (this.formularioCreado.controls['isAlumno'].value &&
                this.formularioCreado.controls['profesorId'].value == -1) {
                this.showToastError('Debes seleccionar un profesor que autorice tu preregistro')
            } else if (!this.formularioCreado.controls['isAlumno'].value &&
                !regexpTeacher.test(this.formularioCreado.controls['email'].value) ) {
                this.showToastError('Debes ingresar un correo de profesor para continuar con tu registro')
            } else {
                this.showSpinner = true
                let email = this.formularioCreado.controls['email'].value
                let password = this.formularioCreado.controls['password'].value
                let isAlumno = this.formularioCreado.controls['isAlumno'].value
                let profesorId = this.formularioCreado.controls['profesorId'].value
                this.PreregisterInjection.crearPreregistro(email, password, isAlumno, profesorId).subscribe((preregisterResponse) => {
                    this.showSpinner = false
                    if (preregisterResponse.code == 201 || preregisterResponse.code == 200) {
                        localStorage.setItem('userEmail', email)
                        localStorage.setItem('userType', isAlumno)
                        this.router.navigate(['/verify/otp'])
                    } else {
                        this.showToastError(preregisterResponse.message)
                    }
                })
            }
        }
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

    showPassword() {
        this.isPasswordEnabled = !this.isPasswordEnabled
    }

}
