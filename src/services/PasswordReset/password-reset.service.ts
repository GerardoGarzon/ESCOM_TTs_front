import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ForgotPasswordResponse} from "../Responses/ForgotPasswordResponse";

@Injectable({
  providedIn: 'root'
})
export class PasswordResetService {

    endpoint: string = 'http://localhost:8000/api'

    constructor(public http: HttpClient) { }


    solicitarCambioContrasena(email: string): Observable<ForgotPasswordResponse> {
        return this.http.post<ForgotPasswordResponse>(`${this.endpoint}/password/forgot`,
            {
                email: email
            },
            {
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'Accept': 'application/json'
                }
            })
    }
}
