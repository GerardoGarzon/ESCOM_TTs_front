import {Component, OnInit} from '@angular/core';
import {Profesor} from "../../../models/profesor";
import {ProfesorsService} from "../../../services/Profesors/profesors.service";
import {Trabajo} from "../../../services/Responses/TrabajosProfesorResponse";
import {TrabajosService} from "../../../services/Trabajos/trabajos.service";
import {ActivatedRoute, Router} from "@angular/router";

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

    constructor(private ProfesorInjection: ProfesorsService,
                private TrabajosInjection: TrabajosService,
                private route: ActivatedRoute,
                private router: Router) {
    }

    ngOnInit(): void {
        this.showSpinner = true
        // @ts-ignore
        this.id = localStorage.getItem('userId')

        // @ts-ignore
        this.token = localStorage.getItem('token')

        if (this.token == null || this.id == null) {
            this.router.navigate(['/'])
        }

        this.obtenerProfesorInfo()
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

    agregarLink(tipo: string) {
        this.ProfesorInjection.agregarLink(tipo, "", this.token).subscribe((response) => {

        }, (error) => {

        })
    }
}
