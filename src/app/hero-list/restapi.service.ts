import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RestAPIService {
  constructor(private http: HttpClient) { }
  getCounteringHeroes(heroes){
    return this.http.post('https://us-central1-dota-meta-test.cloudfunctions.net/heroes/counter', heroes);
  }
}