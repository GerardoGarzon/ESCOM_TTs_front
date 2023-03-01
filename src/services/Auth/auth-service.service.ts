import {Injectable} from '@angular/core';
import {Token} from "../../models/token";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {LogoutResponse} from "../Responses/LogoutResponse";

@Injectable({
    providedIn: 'root'
})
export class AuthServiceService {
    endpoint: string = "http://localhost:8000/api"
    auth: Token = new Token();

    constructor(private http: HttpClient) {
    }

    login(usuario: string, password: string): Observable<Token> {
        return this.http.post<Token>(`${this.endpoint}/auth/login`,
            {
                email: usuario,
                password: password
            },
            {
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'Accept': 'application/json'
                }
            })
    }

    logout(token: string): Observable<LogoutResponse> {
        return this.http.post<LogoutResponse>(`${this.endpoint}/auth/logout`,
            { },
            {
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
    }
}
