import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProfesorsService} from "../../../services/Profesors/profesors.service";
import {Router} from "@angular/router";

declare var bootstrap: any;

@Component({
  selector: 'app-update-profesor-links',
  templateUrl: './update-profesor-links.component.html',
  styleUrls: ['./update-profesor-links.component.scss']
})
export class UpdateProfesorLinksComponent implements OnInit {
    // @ts-ignore
    @ViewChild('btnPhoneClose') closePhone
    // @ts-ignore
    @ViewChild('btnLocationClose') closeLocation
    // @ts-ignore
    @ViewChild('btnGithubClose') closeGithub
    // @ts-ignore
    @ViewChild('btnFilesClose') closeFiles
    @Output() datosActualizados = new EventEmitter()
    @Input() telefono: string = ''
    @Input() github: string = ''
    @Input() archivos: string = ''
    @Input() location: string = ''

    // @ts-ignore
    formArchivos: FormGroup
    // @ts-ignore
    formPhone: FormGroup
    // @ts-ignore
    formGithub: FormGroup
    // @ts-ignore
    formLocation: FormGroup
    message: string = ''
    token: string = ''

    constructor(private formBuilder: FormBuilder,
                private ProfesorInjection: ProfesorsService,
                private router: Router) {
    }

    ngOnInit(): void {
        // @ts-ignore
        this.token = localStorage.getItem('token')

        if ( this.token == null ) {
            this.router.navigate(['/'])
        }

        this.formArchivos = this.formBuilder.group({
            link: [ this.archivos, Validators.compose([
                Validators.required
            ])]
        })
        this.formPhone = this.formBuilder.group({
            link: [ this.telefono, Validators.compose([
                Validators.required
            ])]
        })
        this.formGithub = this.formBuilder.group({
            link: [ this.github, Validators.compose([
                Validators.required
            ])]
        })
        this.formLocation = this.formBuilder.group({
            link: [ this.location, Validators.compose([
                Validators.required
            ])]
        })
    }

    agregarData(tipo: number) {
        var linkData = ''
        if ( tipo == 0 ) {
            if ( this.formPhone.valid ) {
                linkData = this.formPhone.controls['link'].value
            } else {
                this.showToastError('No puedes dejar vacio el link')
                return
            }
        } else if ( tipo == 1 ) {
            if ( this.formGithub.valid ) {
                linkData = this.formGithub.controls['link'].value
            } else {
                this.showToastError('No puedes dejar vacio el link')
                return
            }
        } else if ( tipo == 2 ) {
            if ( this.formArchivos.valid ) {
                linkData = this.formArchivos.controls['link'].value
            } else {
                console.log(this.formArchivos.controls['link'].value)
                this.showToastError('No puedes dejar vacio el link')
                return
            }
        } else if ( tipo == 3 ) {
            if ( this.formLocation.valid ) {
                linkData = this.formLocation.controls['link'].value
            } else {
                this.showToastError('No puedes dejar vacio el link')
                return
            }
        } else {
            this.showToastError('Ocurrio un error, intenta nuevamente')
            return
        }
        this.ProfesorInjection.agregarLink(tipo.toString(), linkData, this.token).subscribe((response) => {
            if (response.code == 200) {
                this.showToastSuccess(response.message)
                this.datosActualizados.emit()
                switch (tipo) {
                    case 0:
                        this.closePhone.nativeElement.click()
                        return
                    case 1:
                        this.closeGithub.nativeElement.click()
                        return
                    case 2:
                        this.closeFiles.nativeElement.click()
                        return;
                    case 3:
                        this.closeLocation.nativeElement.click()
                        return
                }
            } else {
                this.showToastError(response.message)
            }
        }, (error) => {
            this.showToastError('Ocurrio un error, intenta nuevamente')
        })
    }

    showToastError(errorMessage: string) {
        this.message = errorMessage
        const toastLiveExample = document.getElementById('addLinkToastError')
        const toast = new bootstrap.Toast(toastLiveExample)
        toast.show()
    }

    showToastSuccess(successMessage: string) {
        this.message = successMessage
        const toastLiveExample = document.getElementById('addLinkToastSuccess')
        const toast = new bootstrap.Toast(toastLiveExample)
        toast.show()
    }

}
