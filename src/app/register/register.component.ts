import {Component, OnInit} from '@angular/core';
import {ProfesorsService} from "../../services/Profesors/profesors.service";
import {Profesors} from "../../models/profesors";

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
    profesores: Array<Profesors> = new Array<Profesors>()
    isAlumno: boolean = true

    constructor(private ProfesorsInjection: ProfesorsService) {
    }

    ngOnInit(): void {
        this.ProfesorsInjection.leerProfesores().subscribe((profesoresAPI) => {
            this.profesores = profesoresAPI.data
            console.log(this.profesores)
        })
    }


}
