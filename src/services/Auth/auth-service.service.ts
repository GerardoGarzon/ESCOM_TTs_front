import {Injectable} from '@angular/core';
import {Token} from "../../models/token";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AuthServiceService {
    endpoint: string = "http://localhost:8000/api/auth/login"
    auth: Token = new Token();

    constructor(private http: HttpClient) {
    }

    login(usuario: string, password: string): Observable<Token> {
        return this.http.post<Token>(this.endpoint,
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
}
