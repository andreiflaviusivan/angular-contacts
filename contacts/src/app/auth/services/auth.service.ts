import { HttpClient, } from '@angular/common/http';
import { Injectable, EventEmitter, Output, } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { LoginSuccessDto, } from '../dto';

export const TOKEN_KEY = 'access_token';
export const REFRESH_TOKEN_KEY = 'refresh_token';

@Injectable()
export class AuthService {

    constructor() {
        
    }

    login(username, password): Observable<LoginSuccessDto> {
        if (username == "admin" && password == "1q2w3e;L") {
            return of({
                accessToken: "eyJhbGciOiJSUzI1NiIsImtpZCI6IkFFQzIwRTdERUVDQkIyQ0MxNzhFNTBDN0E4NENDM0Q3N0I4RkMwMTAiLCJ0eXAiOiJhdCtqd3QiLCJ4NXQiOiJyc0lPZmU3THNzd1hqbERIcUV6RDEzdVB3QkEifQ.eyJuYmYiOjE1OTA4MzEyNTUsImV4cCI6MTU5MDgzNDg1NSwiaXNzIjoiaHR0cHM6Ly9zc28tdGVzdC5sdHgucm8iLCJhdWQiOiJiYXNpYy1hcGkiLCJjbGllbnRfaWQiOiJzc28tY2xpZW50Iiwic3ViIjoiNDg4MThhOTgtODVmMC00M2UwLWE2ZjUtNmJhYWRlYzBmNDViIiwiYXV0aF90aW1lIjoxNTkwODMxMjU1LCJpZHAiOiJsb2NhbCIsInJvbGVzIjoiYWRtaW4iLCJuYW1lIjoiYWRtaW4iLCJzY29wZSI6WyJiYXNpYy1hcGkiLCJvZmZsaW5lX2FjY2VzcyJdLCJhbXIiOlsicHdkIl19.eCZGV-FQ6K3_ibVo_HoPNzXPd1PdmPjXMRsab6vKTSEIxAAZr9M99kowFAYlcZDC_r2tYeun9J-0KmscKO3UmI271JvRrDn59XPLON21tAO8Vm0euMCcNLjF8Rgcc2GdruP0T8EN_c3xdOTZTDWmBQWy3j1yx3f_pVp7D_q4_r7Yg8l3kjSgyay-oYhypfynvNe5fx_GTNwJdiHNt9lvdjGB2Cu2Nw0bWl775YH0mEvaJq8ZxTAPR8aM2KO8-fVKOJaCevFQsx-DKnOxrwjynOj6W34Kr6ELDmh-bSn0LzhI2AhqKp4R7hqqwR0lQQiIN0U_9HhieujjlI6dMdgBhw",
                expiresIn: 3600,
                refreshToken: "refresh"
            })
        }

        return throwError({})
    }

    refreshAccess(refreshToken: string): Observable<LoginSuccessDto> {
        return of({
            accessToken: "",
            expiresIn: 3600,
            refreshToken: refreshToken
        })
    }
}
