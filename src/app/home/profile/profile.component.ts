import {Component, OnInit} from '@angular/core';
import {Profesor} from "../../../models/profesor";
import {ProfesorsService} from "../../../services/Profesors/profesors.service";
import {Trabajo} from "../../../services/Responses/TrabajosProfesorResponse";
import {TrabajosService} from "../../../services/Trabajos/trabajos.service";
import {ActivatedRoute, Router} from "@angular/router";
import {PasswordResetService} from "../../../services/PasswordReset/password-reset.service";

declare var bootstrap: any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

    showSpinner: boolean = false
    // @ts-ignore
    profesorDetail: Profesor
    showProfesorInfo: boolean = false
    // @ts-ignore
    id: number
    token: string = ''
    trabajosActivos: Array<Trabajo> = new Array<Trabajo>()
    trabajosFinalizados: Array<Trabajo> = new Array<Trabajo>()
    email: string = ''
    message: string = ''
    isAlumno: string | null = ''

    constructor(private ProfesorInjection: ProfesorsService,
                private TrabajosInjection: TrabajosService,
                private route: ActivatedRoute,
                private router: Router,
                private PasswordInjection: PasswordResetService) {
    }

    ngOnInit(): void {
        this.showSpinner = true
        // @ts-ignore
        this.id = localStorage.getItem('userId')

        // @ts-ignore
        this.token = localStorage.getItem('token')

        // @ts-ignore
        this.email = localStorage.getItem('userEmail')

        if ( this.token == null || this.email == null || this.id == null) {
            this.router.navigate(['/'])
        }

        this.isAlumno = localStorage.getItem('isAlumno')

        console.log(this.isAlumno)

        // @ts-ignore
        if ( this.isAlumno == 'false' ) {
            this.obtenerProfesorInfo()
        } else {
            this.router.navigate(['/home/alumno/profile'])
        }
    }

    obtenerProfesorInfo() {
        this.ProfesorInjection.obtenerProfesor(this.id).subscribe((profesorResponse) => {
                this.profesorDetail = profesorResponse
                this.obtenerTrabajosProfesor()
            },
            (error) => {
                this.router.navigate(['/'])
                this.showSpinner = false
            })
    }

    obtenerTrabajosProfesor() {
        console.log('Actualizar vista')
        this.showSpinner = true
        this.TrabajosInjection.obtenerTrabajosTerminales(this.id, this.token).subscribe((trabajosResponse) => {
            if (trabajosResponse.code == 200) {
                this.trabajosActivos = trabajosResponse.data.filter((value) => {
                    return value.status == 0
                })
                this.trabajosFinalizados = trabajosResponse.data.filter((value) => {
                    return value.status == 1
                })
                this.showSpinner = false
                this.showProfesorInfo = true
            } else {
                this.router.navigate(['/'])
                this.showSpinner = false
            }
        })
    }

    removeFromList(event: any) {
        this.trabajosActivos = this.trabajosActivos.filter((value) => {
            return value.id != event
        })
        this.trabajosFinalizados = this.trabajosFinalizados.filter((value) => {
            return value.id != event
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
