import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AlumnosService} from "../../../services/Alumnos/alumnos.service";
import {Alumno} from "../../../services/Responses/AlumnoResponse";
import {PasswordResetService} from "../../../services/PasswordReset/password-reset.service";

declare var bootstrap: any;

@Component({
  selector: 'app-alumno-profile',
  templateUrl: './alumno-profile.component.html',
  styleUrls: ['./alumno-profile.component.scss']
})
export class AlumnoProfileComponent implements OnInit {

    showSpinner: boolean = false
    showAlumnoInfo: boolean = false
    // @ts-ignore
    id: number
    token: string = ''
    email: string = ''
    // @ts-ignore
    alumno: Alumno
    message: string = ''

    constructor(private router: Router,
                private AlumnosInjection: AlumnosService,
                private PasswordInjection: PasswordResetService) {
    }

    ngOnInit(): void {
        // @ts-ignore
        this.id = localStorage.getItem('userId')

        // @ts-ignore
        this.token = localStorage.getItem('token')

        // @ts-ignore
        this.email = localStorage.getItem('userEmail')

        if ( this.token == null || this.email == null || this.id == null) {
            this.router.navigate(['/'])
        }
        this.obtenerAlumno()
    }

    obtenerAlumno() {
        this.showSpinner = true
        this.AlumnosInjection.obtenerAlumno(this.token).subscribe((response) => {
            if (response.code == 200 && response.data != null) {
                this.alumno = response.data
                this.showAlumnoInfo = true
            } else {
                this.router.navigate(['/'])
            }
            this.showSpinner = false
        })
    }

    solicitarCambioPass() {
        this.showSpinner = true
        this.PasswordInjection.solicitarCambioContrasena(this.email).subscribe((forgotPasswordResponse) => {
            this.showSpinner = false
            if (forgotPasswordResponse.code == 200) {
                this.showToastSuccess(forgotPasswordResponse.message)
            } else {
                this.showToastError(forgotPasswordResponse.message)
            }
        })
    }

    showToastError(errorMessage: string) {
        this.message = errorMessage
        const toastLiveExample = document.getElementById('passwordToastError')
        const toast = new bootstrap.Toast(toastLiveExample)
        toast.show()
    }

    showToastSuccess(successMessage: string) {
        this.message = successMessage
        const toastLiveExample = document.getElementById('passwordToastSuccess')
        const toast = new bootstrap.Toast(toastLiveExample)
        toast.show()
    }
}
