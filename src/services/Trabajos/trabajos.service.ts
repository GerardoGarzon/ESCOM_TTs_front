import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Trabajo, TrabajosProfesorResponse} from "../Responses/TrabajosProfesorResponse";
import {TrabajoTerminalResponse} from "../Responses/TrabajoTerminalResponse";

@Injectable({
  providedIn: 'root'
})
export class TrabajosService {

    endpoint: string = "http://localhost:8000/api"

    constructor(private http: HttpClient) { }

    obtenerTrabajosTerminales(id: number, token: string): Observable<TrabajosProfesorResponse> {
        return this.http.get<TrabajosProfesorResponse>(`${this.endpoint}/profesor/trabajos/${id}`,
            {
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
    }

    obtenerTrabajoTerminal(id: number, token: string): Observable<TrabajoTerminalResponse> {
        return this.http.get<TrabajoTerminalResponse>(`${this.endpoint}/trabajo/${id}`,
            {
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
    }
}
