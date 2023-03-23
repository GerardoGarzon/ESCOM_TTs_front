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
    activePage: number = 1
    numberPages: number = 1
    arrayCount: Array<string> = new Array<string>(1)

    constructor(private ProfesorInjection: ProfesorsService) {
    }

    ngOnInit(): void {
        this.nextPageItems(this.activePage)
    }

    nextPageItems(page: number) {
        this.showSpinner = true
        this.ProfesorInjection.leerProfesores(true, page).subscribe((profesorsResponse) => {
            this.profesorsList = profesorsResponse.data
            this.activePage = profesorsResponse.activePage
            this.numberPages = profesorsResponse.numberPages
            this.arrayCount = new Array<string>(this.numberPages)
            this.showSpinner = false
            this.profesorsReady = true
        })
    }
}
