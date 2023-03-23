import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AnimationItem} from "lottie-web";
import {AnimationOptions} from "ngx-lottie";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

    optionsCrear: AnimationOptions = {
        path: '/assets/lottie/crear.json'
    };

    optionsActivar: AnimationOptions = {
        path: '/assets/lottie/alumno.json'
    };

    optionsProfesor: AnimationOptions = {
        path: '/assets/lottie/profesores.json'
    };

    optionsTrabajos: AnimationOptions = {
        path: '/assets/lottie/trabajos.json'
    };

    isProfesor: boolean = false

    constructor(private router: Router) {
    }
    ngOnInit(): void {
        let isAlumno = localStorage.getItem('isAlumno')

        if ( isAlumno == null ) {
            this.router.navigate(['/'])
        } else {
            if (isAlumno == "true") {
                this.isProfesor = false
            } else {
                this.isProfesor = true
            }
        }
    }

    onAnimate(animationItem: AnimationItem): void {
        console.log(animationItem);
    }

}
