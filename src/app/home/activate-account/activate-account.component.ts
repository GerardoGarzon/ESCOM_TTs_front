import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {PreregistrosService} from "../../../services/Preregistros/preregistros.service";
import {PendingPreregister} from "../../../services/Responses/PendindPreregisterResponse";

declare var bootstrap: any;

@Component({
  selector: 'app-activate-account',
  templateUrl: './activate-account.component.html',
  styleUrls: ['./activate-account.component.scss']
})
export class ActivateAccountComponent implements OnInit {
    preregistros: Array<PendingPreregister> = new Array<PendingPreregister>()
    showSpinner: boolean = false
    token: string = ''
    email: string = ''
    message: string = ''
    selectAll: boolean = false


    constructor(private activeRouter: ActivatedRoute,
                private router: Router,
                private PreregisterInjection: PreregistrosService ) {
    }

    ngOnInit(): void {
        // @ts-ignore
        this.token = localStorage.getItem('token')
        // @ts-ignore
        this.email = localStorage.getItem('userEmail')

        if ( this.token == null || this.email == null ) {
            this.router.navigate(['/'])
        } else {
            this.obtenerPreregistros()
        }
    }

    obtenerPreregistros() {
        this.showSpinner = true
        this.PreregisterInjection.obtenerPreregistrosPendientes(this.token).subscribe((preregisterResponse) => {
            if (preregisterResponse.code == 200) {
                this.preregistros = preregisterResponse.data
                this.showSpinner = false
            } else {
                this.router.navigate(['/'])
                this.showSpinner = false
            }
        },
        (error) => {
            this.router.navigate(['/'])
            this.showSpinner = false
        })
    }

    activarAlumno(id: string) {
        this.showSpinner = true
        this.PreregisterInjection.activarAlumno(id, this.email, this.token).subscribe((activateResponse) => {
            if (activateResponse.code == 200) {
                this.showToastSuccess(activateResponse.message)
                this.preregistros = this.preregistros.filter((value) => {
                    return value.email != id
                })
            } else {
                this.showToastError(activateResponse.message)
            }
            this.showSpinner = false
        })
    }

    eliminarPreregistro(id: string) {
        this.showSpinner = true
        this.PreregisterInjection.eliminarPreregistro(id, this.token).subscribe((activateResponse) => {
            if (activateResponse.code == 200) {
                this.showToastSuccess(activateResponse.message)
                this.preregistros = this.preregistros.filter((value) => {
                    return value.email != id
                })
            } else {
                this.showToastError(activateResponse.message)
            }
            this.showSpinner = false
        })
    }

    seleccionarTodos() {
        this.selectAll = !this.selectAll
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
