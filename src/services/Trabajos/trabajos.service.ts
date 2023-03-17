import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Trabajo, TrabajosProfesorResponse} from "../Responses/TrabajosProfesorResponse";
import {TrabajoTerminalResponse} from "../Responses/TrabajoTerminalResponse";
import {GeneralResponse} from "../Responses/GeneralResponse";

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

    eliminarTrabajoTerminale(id: number, token: string): Observable<GeneralResponse> {
        return this.http.delete<GeneralResponse>(`${this.endpoint}/trabajo`,
            {
                body: {
                    tt_id: id
                },
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

    crearTrabajoTerminal(nombre: string, descripcion: string, link: string, numero: string, alumnos: Array<string>, token: string): Observable<GeneralResponse> {
        return this.http.post<GeneralResponse>(`${this.endpoint}/trabajo`,
            {
                nombre,
                descripcion,
                tipo: 0,
                link,
                numero,
                alumnos
            },
            {
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
    }

    agregarAlumnoTrabajo(tt_id: number, alumnos: Array<string>, token: string): Observable<GeneralResponse> {
        return this.http.put<GeneralResponse>(`${this.endpoint}/trabajo/new/student`,
            {
                tt_id,
                alumnos
            },
            {
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
    }

    actualizarTrabajoTerminal(tt_id: number, nombre: string, descripcion: string, link: string, tipo: number, token: string): Observable<GeneralResponse> {
        return this.http.put<GeneralResponse>(`${this.endpoint}/trabajo`,
            {
                tt_id,
                nombre,
                descripcion,
                tipo,
                link,
            },
            {
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
    }

    eliminarAlumnoTrabajo(id: number, tt_id: number, token: string): Observable<GeneralResponse> {
        return this.http.put<GeneralResponse>(`${this.endpoint}/trabajo/delete/student`,
            {
                tt_id: tt_id.toString(),
                alumno_id: id.toString()
            },
            {
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
    }

    buscarTrabajos(query: string, token: string): Observable<TrabajosProfesorResponse> {
        return this.http.get<TrabajosProfesorResponse>(`${this.endpoint}/trabajo/search?query=${query}`,
            {
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
    }
}
