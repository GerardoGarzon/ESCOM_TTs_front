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
    showSpinner: boolean = false

    constructor(private router: Router,
                private AuthInjection: AuthServiceService) {
    }

    ngOnInit(): void {
        // @ts-ignore
        this.token = localStorage.getItem('token')
        let isAlumno = localStorage.getItem('isAlumno')

        if ( this.token == null || isAlumno == null ) {
            this.router.navigate(['/'])
        }
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
