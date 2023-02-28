import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {RegisterService} from "../../services/Register/register.service";

declare var bootstrap: any;

@Component({
    selector: 'app-finish-register',
    templateUrl: './finish-register.component.html',
    styleUrls: ['./finish-register.component.scss']
})

export class FinishRegisterComponent implements OnInit{
    // @ts-ignore
    formularioCreado: FormGroup;
    message: string = ''
    token: string = ''

    constructor(private formBuilder: FormBuilder,
                private router: ActivatedRoute,
                private route: Router,
                private PreregisterInjection: RegisterService ) {
    }

    ngOnInit(): void {
        this.token = this.router.snapshot.params['token']

        if (this.token == '') {
            this.route.navigate(['/'])
        }

        this.formularioCreado = this.formBuilder.group({
            nombre: ['', Validators.compose([
                Validators.required
            ])],
            telefono: ['', Validators.compose([
                Validators.required
            ])],
            boleta: ['', Validators.compose([
                Validators.required
            ])]
        })
    }

    showToastError(errorMessage: string) {
        this.message = errorMessage
        const toastLiveExample = document.getElementById('liveToast')
        const toast = new bootstrap.Toast(toastLiveExample)
        toast.show()
    }

    completarRegistro() {

    }

}
