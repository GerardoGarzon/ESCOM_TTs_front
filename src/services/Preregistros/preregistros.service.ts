import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {PendindPreregisterResponse} from "../Responses/PendindPreregisterResponse";
import {ActivateUserResponse} from "../Responses/ActivateUserResponse";

@Injectable({
  providedIn: 'root'
})
export class PreregistrosService {

    endpoint: string = "http://localhost:8000/api"

    constructor(private http: HttpClient) {
    }

    obtenerPreregistrosPendientes(token: string): Observable<PendindPreregisterResponse> {
        return this.http.get<PendindPreregisterResponse>(`${this.endpoint}/usuarios`,
            {
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
    }

    activarAlumno(alumno: string, profesor: string, token: string): Observable<ActivateUserResponse> {
        return this.http.put<ActivateUserResponse>(`${this.endpoint}/alumno/activate`,
            {
                alumno_email: alumno,
                email: profesor
            },
            {
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
    }

    eliminarPreregistro(alumno: string, token: string): Observable<ActivateUserResponse> {
        return this.http.delete<ActivateUserResponse>(`${this.endpoint}/preregistros`,
            {
                body: {
                    alumno_email: alumno
                },
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
    }
}
