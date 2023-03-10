import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {TrabajosService} from "../../../services/Trabajos/trabajos.service";
import {Router} from "@angular/router";

declare var bootstrap: any;

@Component({
  selector: 'app-create-trabajo',
  templateUrl: './create-trabajo.component.html',
  styleUrls: ['./create-trabajo.component.scss']
})
export class CreateTrabajoComponent implements OnInit {
    // @ts-ignore
    @ViewChild('closeButton') closebutton
    @Output() agregadoExitosamente = new EventEmitter()
    numeroAlumnos: number = 1
    alumnosTempleteArray: Array<number> = new Array(1).fill(0)
    // @ts-ignore
    formularioCreado: FormGroup
    token: string = ''
    showSpinner: boolean = false
    message: string = ''

    constructor(private formBuilder: FormBuilder,
                private TrabajoInjection: TrabajosService,
                private router: Router) {
    }

    ngOnInit(): void {
        this.crearFormulario()

        // @ts-ignore
        this.token = localStorage.getItem('token')

        if (this.token == null ) {
            this.router.navigate(['/'])
        }
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
            ])],
            alumnos: new FormArray([
                new FormGroup({
                    alumno: new FormControl('', [Validators.required])
                })
            ], [Validators.required])
        })
    }

    agregarNuevoAlumno() {
        let nuevoAlumno = new FormGroup({
            alumno: new FormControl('', [Validators.required])
        })
        const refAlumnos = this.formularioCreado.get('alumnos') as FormArray
        refAlumnos.push(nuevoAlumno)
    }

    resetView() {
        this.crearFormulario()
        this.closebutton.nativeElement.click();
    }

    crearTrabajo() {
        if (this.formularioCreado.valid) {
            let nombre = this.formularioCreado.controls['nombre'].value
            let descripcion = this.formularioCreado.controls['descripcion'].value
            let link = this.formularioCreado.controls['link'].value
            let numero = this.formularioCreado.controls['identificador'].value
            let alumnos_object = this.formularioCreado.controls['alumnos'].value
            let alumnos :string[] = []

            alumnos_object.forEach((value: { alumno: string; }) => {
                alumnos.push(value.alumno)
            })

            this.TrabajoInjection.crearTrabajoTerminal(nombre, descripcion, link, numero, alumnos, this.token).subscribe((response) => {
                if (response.code == 201) {
                    this.showToastSuccess(response.message)
                    this.agregadoExitosamente.emit()
                    this.closebutton.nativeElement.click();
                } else {
                    this.showToastError(response.message)
                }
            }, (error) => {
                this.showToastError('Ocurrio un error, intente nuevamente')
            })
        } else {
            this.showToastError('Debes llenar correctamente todos los campos')
        }
    }

    getControls(key: string, formGroup: FormGroup): any {
        return formGroup.get(key)
    }

    showToastError(errorMessage: string) {
        this.message = errorMessage
        const toastLiveExample = document.getElementById('addTrabajoToastError')
        const toast = new bootstrap.Toast(toastLiveExample)
        toast.show()
    }

    showToastSuccess(successMessage: string) {
        this.message = successMessage
        const toastLiveExample = document.getElementById('addTrabajoToastSuccess')
        const toast = new bootstrap.Toast(toastLiveExample)
        toast.show()
    }

    deleteRow(index: number) {
        const refAlumnos = this.formularioCreado.get('alumnos') as FormArray
        refAlumnos.removeAt(index)
    }
}
