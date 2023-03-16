import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {PreregistrosService} from "../../../services/Preregistros/preregistros.service";
import {PendingPreregister} from "../../../services/Responses/PendindPreregisterResponse";
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

declare var bootstrap: any;
declare var angular: any;

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
    preregistersReady: boolean = false
    acceptArrayPreregister: Array<string> = new Array<string>()


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
                this.preregistersReady = true
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

    activarAlumnos() {
        console.log(this.acceptArrayPreregister)
        this.showSpinner = true
        this.PreregisterInjection.activarPreregistros(this.acceptArrayPreregister, this.token).subscribe((activateResponse) => {
            if (activateResponse.code == 200) {
                this.showToastSuccess(activateResponse.message)
                this.preregistros = this.preregistros.filter((value) => {
                    return this.acceptArrayPreregister.some(e => {
                        return e != value.email
                    })
                })
                this.acceptArrayPreregister = new Array<string>()
                console.log(this.acceptArrayPreregister)
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

    seleccionarTodos(event: any) {
        for (let i = 0; i < this.preregistros.length; i++) {
            if (event.target.checked) {
                // @ts-ignore
                document.getElementById( 'isSelectedCheck_' + i ).checked = true
                // @ts-ignore
                this.acceptArrayPreregister.push(document.getElementById( 'isSelectedCheck_' + i ).value)
            } else {
                // @ts-ignore
                document.getElementById( 'isSelectedCheck_' + i ).checked = false
                this.acceptArrayPreregister = this.acceptArrayPreregister.filter( value => {
                    // @ts-ignore
                    return value != document.getElementById( 'isSelectedCheck_' + i ).value
                })
            }
        }
    }

    addRemovePreregister(event: any, id: string) {
        if (event.target.checked) {
            this.acceptArrayPreregister.push(id)
        } else {
            this.acceptArrayPreregister = this.acceptArrayPreregister.filter( value => {
                return value != id
            })
        }
        console.log(this.acceptArrayPreregister)
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
