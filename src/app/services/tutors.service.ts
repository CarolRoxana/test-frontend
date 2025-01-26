import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import {environment} from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class TutorsService {

  private baseUrl = environment.baseUrl
  private apiKey = environment.apiKey

  constructor(private http: HttpClient) { }

  getTutors(): Observable<any> {
    return this.http.get(`${this.baseUrl}/tutors`, {
      headers:{
        'x-api-key': this.apiKey
      }
    })
  }
}


