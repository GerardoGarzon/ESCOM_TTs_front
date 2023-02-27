import { Injectable } from '@angular/core';
import {Profesors, ProfesorsResponse} from "../../models/profesors";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProfesorsService {
    endpoint: string = "http://localhost:8000/api/"

  constructor( private http: HttpClient ) { }

    leerProfesores(): Observable<ProfesorsResponse> {
      return this.http.get<ProfesorsResponse>(`${this.endpoint}profesors`)
    }
}
