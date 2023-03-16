import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {TrabajosService} from "../../../services/Trabajos/trabajos.service";
import {Router} from "@angular/router";

declare var bootstrap: any;

@Component({
  selector: 'app-add-student-trabajo',
  templateUrl: './add-student-trabajo.component.html',
  styleUrls: ['./add-student-trabajo.component.scss']
})
export class AddStudentTrabajoComponent implements OnInit {
    // @ts-ignore
    @ViewChild('closeButton') closebutton
    @Output() actualizadoExitosamente = new EventEmitter()
    @Input() id: number = 0
    @Input() titulo: string = ''
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

    actualizarTrabajo() {
        if (this.formularioCreado.valid) {
            let alumnos_object = this.formularioCreado.controls['alumnos'].value
            let alumnos :string[] = []

            alumnos_object.forEach((value: { alumno: string; }) => {
                alumnos.push(value.alumno)
            })

            this.TrabajoInjection.agregarAlumnoTrabajo(this.id, alumnos, this.token).subscribe((response) => {
                if (response.code == 200) {
                    this.showToastSuccess(response.message)
                    this.actualizadoExitosamente.emit()
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
