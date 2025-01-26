import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import {environment} from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  private baseUrl = environment.baseUrl
  private apiKey = environment.apiKey

  constructor(private http: HttpClient) { }

  getStudents(): Observable<any> {
    return this.http.get(`${this.baseUrl}/users`, {
      headers:{
        'x-api-key': this.apiKey
      }
    })
  }
}


