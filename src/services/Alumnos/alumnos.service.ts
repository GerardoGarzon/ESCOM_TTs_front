import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ProfesorsResponse} from "../../models/profesor";
import {AlumnoResponse} from "../Responses/AlumnoResponse";

@Injectable({
  providedIn: 'root'
})
export class AlumnosService {
    endpoint: string = "http://localhost:8000/api"

    constructor(private http: HttpClient) {
    }

    obtenerAlumno(token: string): Observable<AlumnoResponse> {
        return this.http.get<AlumnoResponse>(`${this.endpoint}/alumno`,
            {
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
    }
}
