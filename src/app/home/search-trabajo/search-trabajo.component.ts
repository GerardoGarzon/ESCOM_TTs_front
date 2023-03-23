import {Component, OnInit, ViewChild} from '@angular/core';
import {TrabajosService} from "../../../services/Trabajos/trabajos.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {Trabajo} from "../../../services/Responses/TrabajosProfesorResponse";

@Component({
  selector: 'app-search-trabajo',
  templateUrl: './search-trabajo.component.html',
  styleUrls: ['./search-trabajo.component.scss']
})
export class SearchTrabajoComponent implements OnInit {

    trabajos: Array<Trabajo> = new Array<Trabajo>()
    // @ts-ignore
    fromularioCreado: FormGroup
    token: string = ''
    showSpinner: boolean = false

    constructor(private TrabajosInjection: TrabajosService,
                private formBuilder: FormBuilder,
                private router: Router) {
    }

    ngOnInit(): void {
        // @ts-ignore
        this.token = localStorage.getItem('token')

        if ( this.token == null ) {
            this.router.navigate(['/'])
        } else {
            this.crearFormulario()
        }
    }

    crearFormulario() {
        this.fromularioCreado = this.formBuilder.group({
            query: [ '', Validators.compose([
                Validators.required,
                Validators.minLength(3)
            ])]
        })
    }

    buscarTrabajos() {
        this.showSpinner = true
        if (this.fromularioCreado.controls['query'].valid) {
            this.TrabajosInjection.buscarTrabajos(this.fromularioCreado.controls['query'].value, this.token).subscribe((response) => {
                if (response.code == 200) {
                    this.trabajos = response.data
                } else {
                    this.trabajos = new Array<Trabajo>()
                }
                this.showSpinner = false
            }, (error) => {
                this.showSpinner = false
            })
        }
    }
}
