import {Injectable} from '@angular/core';
import {Profesor, ProfesorsResponse} from "../../models/profesor";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {ActivateUserResponse} from "../Responses/ActivateUserResponse";

@Injectable({
    providedIn: 'root'
})
export class ProfesorsService {
    endpoint: string = "http://localhost:8000/api"

    constructor(private http: HttpClient) {
    }

    leerProfesores(): Observable<ProfesorsResponse> {
        return this.http.get<ProfesorsResponse>(`${this.endpoint}/profesors`,
            {
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'Accept': 'application/json'
                }
            })
    }

    obtenerProfesor(id: number): Observable<Profesor> {
        return this.http.get<Profesor>(`${this.endpoint}/profesor/detail/${id}`,
            {
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'Accept': 'application/json'
                }
            })
    }

    agregarLink(tipo: string, url: string, token: string) {
        return this.http.post<ActivateUserResponse>(`${this.endpoint}/add/${tipo}URL`,
            {
                url: url
            },
            {
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
    }
}
