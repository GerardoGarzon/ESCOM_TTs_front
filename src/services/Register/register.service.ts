import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CreatePreregisterResponse} from "../Responses/CreatePreregisterResponse";
import {Token} from "../../models/token";
import {VerifyOTPResponse} from "../Responses/VerifyOTPResponse";
import {ResendCodeResponse} from "../Responses/ResendCodeResponse";

@Injectable({
    providedIn: 'root'
})
export class RegisterService {

    endpoint: string = "http://localhost:8000/api"

    constructor(private http: HttpClient) {
    }

    crearPreregistro(email: string, password: string, isAlumno: boolean, idProfesor: string): Observable<CreatePreregisterResponse> {
        return this.http.post<CreatePreregisterResponse>(`${this.endpoint}/auth/preregister`,
            {
                email: email,
                password: password,
                isAlumno: isAlumno,
                idProfesor: idProfesor
            },
            {
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'Accept': 'application/json'
                }
            })
    }

    verificarOTP(email: string, otp: string): Observable<VerifyOTPResponse> {
        return this.http.post<VerifyOTPResponse>(`${this.endpoint}/auth/otp/verify`,
            {
                email: email,
                otp: otp
            },
            {
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'Accept': 'application/json'
                }
            })
    }

    reenviarCodigoOTP(email: string): Observable<ResendCodeResponse> {
        return this.http.post<ResendCodeResponse>(`${this.endpoint}/auth/otp/resend`,
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
