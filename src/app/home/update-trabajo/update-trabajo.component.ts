import {ChangeDetectorRef, Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {TrabajosService} from "../../../services/Trabajos/trabajos.service";
import {Router} from "@angular/router";
import {TrabajoTerminal} from "../../../services/Responses/TrabajoTerminalResponse";

declare var bootstrap: any;
@Component({
  selector: 'app-update-trabajo',
  templateUrl: './update-trabajo.component.html',
  styleUrls: ['./update-trabajo.component.scss']
})
export class UpdateTrabajoComponent {
    // @ts-ignore
    @ViewChild('closeButtonUpdate') closebutton
    @Output() actualizadoExitosamente = new EventEmitter()
    @Input() id: number = 0
    @Input() identificador: string = ''
    @Input() nombre: string = ''
    @Input() descripcion: string = ''
    @Input() tipo: number = 0
    @Input() link: string = ''
    // @ts-ignore
    formularioCreado: FormGroup
    token: string = ''
    message: string = ''
    opcionesTrabajoTerminal: Array<any> = [
        {
            value: 0,
            desc: 'Protocolo'
        },
        {
            value: 1,
            desc: 'Trabajo Terminal 1'
        },
        {
            value: 2,
            desc: 'Trabajo Terminal 2'
        },
        {
            value: 3,
            desc: 'Trabajo Terminal Remedial'
        },
        {
            value: 4,
            desc: 'Finalizado'
        }
    ]
    // @ts-ignore
    trabajo: TrabajoTerminal

    constructor(private formBuilder: FormBuilder,
                private TrabajoInjection: TrabajosService,
                private router: Router,
                private ref: ChangeDetectorRef ) {
    }

    ngOnInit(): void {
        // @ts-ignore
        this.token = localStorage.getItem('token')
        if (this.token == null ) {

            this.router.navigate(['/'])
        }
        this.crearFormulario()
        this.obtenerTrabajoTerminal()
    }

    crearFormulario() {
        if (this.trabajo == null) {
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
                tipoTrabajo: [ 0, Validators.compose([
                    Validators.required
                ])]
            })
        } else {
            this.formularioCreado = this.formBuilder.group({
                identificador: [ this.trabajo.tt_identificador, Validators.compose([
                    Validators.required
                ])],
                nombre: [ this.trabajo.name, Validators.compose([
                    Validators.required
                ])],
                descripcion: [ this.trabajo.description, Validators.compose([
                    Validators.required
                ])],
                link: [ this.trabajo.link, Validators.compose([
                    Validators.required
                ])],
                tipoTrabajo: [ this.trabajo.type, Validators.compose([
                    Validators.required
                ])]
            })
        }
    }

    resetView() {
        this.crearFormulario()
        this.closebutton.nativeElement.click();
    }

    actualizarTrabajo() {
        if (this.formularioCreado.valid) {
            let nombre = this.formularioCreado.controls['nombre'].value
            let descripcion = this.formularioCreado.controls['descripcion'].value
            let link = this.formularioCreado.controls['link'].value
            let tipo = this.formularioCreado.controls['tipoTrabajo'].value

            this.TrabajoInjection.actualizarTrabajoTerminal(this.id, nombre, descripcion, link, tipo, this.token).subscribe((response) => {
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

    showToastError(errorMessage: string) {
        this.message = errorMessage
        const toastLiveExample = document.getElementById('updateTrabajoToastError')
        const toast = new bootstrap.Toast(toastLiveExample)
        toast.show()
    }

    showToastSuccess(successMessage: string) {
        this.message = successMessage
        const toastLiveExample = document.getElementById('updateTrabajoToastSuccess')
        const toast = new bootstrap.Toast(toastLiveExample)
        toast.show()
    }

    obtenerTrabajoTerminal() {
        this.TrabajoInjection.obtenerTrabajoTerminal(this.id, this.token).subscribe((trabajoResponse) => {
            if (trabajoResponse.code == 200) {
                this.trabajo = trabajoResponse.data
                this.crearFormulario()
            } else {
                this.router.navigate(['..'])
            }

        }, (error) => {
            this.router.navigate(['..'])
        })
    }

    eliminarAlumno(id: number, tt_id: number) {
        this.TrabajoInjection.eliminarAlumnoTrabajo(id, tt_id, this.token).subscribe((trabajoResponse) => {
            if (trabajoResponse.code == 200) {
                this.showToastSuccess(trabajoResponse.message)
                this.trabajo.alumnos = this.trabajo.alumnos.filter((value) => {
                    return value.id != id
                })
            } else {
                this.showToastError(trabajoResponse.message)
            }

        }, (error) => {
            this.showToastError('Ocurrio un error al eliminar el alumno')
        })
    }
}
