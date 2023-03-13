import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TrabajosService} from "../../../services/Trabajos/trabajos.service";

@Component({
  selector: 'app-create-trabajo',
  templateUrl: './create-trabajo.component.html',
  styleUrls: ['./create-trabajo.component.scss']
})
export class CreateTrabajoComponent implements OnInit {
    numeroAlumnos: number = 1
    alumnosTempleteArray: Array<number> = new Array(1).fill(0)
    // @ts-ignore
    formularioCreado: FormGroup

    constructor(private formBuilder: FormBuilder,
                private TrabajoInjection: TrabajosService) {
    }

    ngOnInit(): void {
        this.crearFormulario()
    }

    crearFormulario() {
        this.formularioCreado = this.formBuilder.group({
            identificador: [ '', Validators.compose([
                Validators.required
            ])],
            nombre: [ '', Validators.compose([
                Validators.required
            ])],
            descripcion: [ '', Validators.compose([
                Validators.required
            ])],
            link: [ '', Validators.compose([
                Validators.required
            ])]
        })
    }

    agregarNuevoAlumno() {
        this.numeroAlumnos += 1
        this.alumnosTempleteArray = new Array(this.numeroAlumnos)
    }

    resetView() {
        this.numeroAlumnos = 1
        this.alumnosTempleteArray = new Array(1)
    }

    crearTrabajo() {
        console.log(this.formularioCreado.value)
        if (this.formularioCreado.valid) {
            let nombre = this.formularioCreado.controls['nombre'].value
            let descripcion = this.formularioCreado.controls['descripcion'].value
            let link = this.formularioCreado.controls['link'].value
            let numero = this.formularioCreado.controls['identificador'].value
            this.TrabajoInjection.crearTrabajoTerminal()
        }
        this.resetView()
    }
}
