import {Component, OnInit} from '@angular/core';
import {ProfesorsService} from "../../../services/Profesors/profesors.service";
import {Profesor} from "../../../models/profesor";
import {ActivatedRoute, Router} from "@angular/router";
import {TrabajosService} from "../../../services/Trabajos/trabajos.service";
import {Trabajo} from "../../../services/Responses/TrabajosProfesorResponse";

@Component({
  selector: 'app-profesor-detail',
  templateUrl: './profesor-detail.component.html',
  styleUrls: ['./profesor-detail.component.scss']
})
export class ProfesorDetailComponent implements OnInit {

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
        this.id = this.route.snapshot.params['id']

        // @ts-ignore
        this.token = localStorage.getItem('token')

        if (this.token == null) {
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
}
