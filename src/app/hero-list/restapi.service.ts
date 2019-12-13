import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RestAPIService {
  constructor(private http: HttpClient) { }

  getHeroes(){
    return this.http.get('/heroes/all');
  }
  getRoles(){
    return this.http.get('/roles');
  }
  getCounteringHeroes(idStr){
    return this.http.get(`/heroes/counter/${idStr}`);
  }
}