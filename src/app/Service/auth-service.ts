import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl = 'https://study-sync-project-production.up.railway.app/api/auth';
  constructor(private http: HttpClient) {}
  registerStudent(userData:any): Observable<any>{
    return this.http.post(`${this.baseUrl}/register/student`,userData)
  }
  registerInstructor(userData:any): Observable<any>{
    return this.http.post(`${this.baseUrl}/register/instructor`,userData)
  }
  login(userData:any): Observable<any>{
    return this.http.post(`${this.baseUrl}/login`,userData)
  }

}
