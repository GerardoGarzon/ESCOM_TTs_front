import {Component, OnInit} from '@angular/core';
import {ProfesorsService} from "../../../services/Profesors/profesors.service";
import {Profesor} from "../../../models/profesor";

@Component({
  selector: 'app-student-home',
  templateUrl: './student-home.component.html',
  styleUrls: ['./student-home.component.scss']
})
export class StudentHomeComponent implements OnInit {
    profesorsList: Array<Profesor> = new Array<Profesor>()
    showSpinner: boolean = false
    profesorsReady: boolean = false

    constructor(private ProfesorInjection: ProfesorsService) {
    }

    ngOnInit(): void {
        this.showSpinner = true
        this.ProfesorInjection.leerProfesores().subscribe((profesorsResponse) => {
            this.profesorsList = profesorsResponse.data
            this.showSpinner = false
            this.profesorsReady = true
        })

    }


}
