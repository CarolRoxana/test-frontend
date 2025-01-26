import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import {environment} from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class ClassesService {

  private baseUrl = environment.baseUrl
  private apiKey = environment.apiKey

  constructor(private http: HttpClient) { }

  getClasses(): Observable<any> {
    return this.http.get(`${this.baseUrl}/booking`, {
      headers:{
        'x-api-key': this.apiKey
      }
    })
  }
}


