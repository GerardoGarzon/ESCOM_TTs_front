import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import {TrabajosService} from "../../../services/Trabajos/trabajos.service";
import {Router} from "@angular/router";

declare var bootstrap: any;

@Component({
  selector: 'app-trabajo-card',
  templateUrl: './trabajo-card.component.html',
  styleUrls: ['./trabajo-card.component.scss']
})
export class TrabajoCardComponent implements OnInit {
    @Input() id: number = 0
    @Input() titulo: string = ""
    @Input() identificador: string = ""
    @Input() status: number = 0
    @Input() link: number = 1
    @Input() edit: boolean = false
    @Output() eliminadoExitosamente = new EventEmitter()
    @Output() actualizarLista = new EventEmitter()

    token: string = ''

    statusString: string = ''
    message: string = ''

    constructor(private TrabajosInjection: TrabajosService,
                private router: Router) {
    }

    ngOnInit(): void {
        console.log(this.status)
        if (this.status == 0) {
            this.statusString = 'Protocolo'
        } else if (this.status == 1) {
            this.statusString = 'Trabajo terminal 1'
        } else if (this.status == 2) {
            this.statusString = 'Trabajo terminal 2'
        } else if (this.status == 3) {
            this.statusString = 'Trabajo terminal remedial'
        } else {
            this.statusString = 'Finalizado'
        }

        // @ts-ignore
        this.token = localStorage.getItem('token')

        if (this.token == null || this.id == null) {
            this.router.navigate(['/'])
        }
    }

    eliminarTrabajoTerminal() {
        this.TrabajosInjection.eliminarTrabajoTerminale(this.id, this.token).subscribe((response) => {
            if (response.code == 200) {
                this.showToastSuccess(response.message)
                this.eliminadoExitosamente.emit(this.id)
            } else {
                this.showToastError(response.message)
            }
        }, (error) => {
            console.log(error)
        })
    }

    showToastError(errorMessage: string) {
        this.message = errorMessage
        const toastLiveExample = document.getElementById('liveToast')
        const toast = new bootstrap.Toast(toastLiveExample)
        toast.show()
    }

    showToastSuccess(successMessage: string) {
        this.message = successMessage
        const toastLiveExample = document.getElementById('liveToastSuccess')
        const toast = new bootstrap.Toast(toastLiveExample)
        toast.show()
    }

}
