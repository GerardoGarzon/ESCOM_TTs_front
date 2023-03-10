import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthServiceService} from "../../services/Auth/auth-service.service";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    token: string = ''
    showSpinner: boolean = true
    isProfesor: boolean = true
    userName: string = ''
    homePath: string = '/home'

    constructor(private router: Router,
                private AuthInjection: AuthServiceService) {
    }

    ngOnInit(): void {
        // @ts-ignore
        this.token = localStorage.getItem('token')
        let isAlumno = localStorage.getItem('isAlumno')

        if (this.token == null || isAlumno == null) {
            this.router.navigate(['/'])
        }

        this.AuthInjection.me(this.token).subscribe((meResponse) => {
            this.showSpinner = false
            if (meResponse.id === undefined) {
                localStorage.clear()
                this.router.navigate(['/'])
            } else {
                this.isProfesor = Boolean(meResponse.type)
                localStorage.setItem('userId', String(meResponse.id))
                this.userName = meResponse.name

                if (this.isProfesor) {
                    this.homePath = '/home/profesor'
                } else {
                    this.homePath = '/home/alumno'
                }
            }
        })
    }

    cerrarSesion() {
        this.showSpinner = true
        this.AuthInjection.logout(this.token).subscribe((logoutResponse) => {
            this.showSpinner = false
            if (logoutResponse.message == 'Sesion terminada') {
                localStorage.clear()
                this.router.navigate(['/'])
            }
        })
    }
}
