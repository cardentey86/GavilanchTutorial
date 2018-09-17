import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Persona} from './persona';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  constructor(private http: HttpClient) { }

  getAll(): Observable <Persona[]> {
    return this.http.get<Persona[]>(`${environment.api.url}personas`);
  }

  create(persona: Persona): Observable<Persona>{
    return this.http.post<Persona>(`${environment.api.url}personas`, persona);
  }

  getById(id: number): Observable<Persona>{
    return this.http.get<Persona>(`${environment.api.url}personas/${id}`);
  }

  update(persona: Persona):Observable<Persona>{
    return this.http.put<Persona>(`${environment.api.url}personas/${persona.id}`, persona);
  }

  delete(persona: Persona):Observable<Persona>{
    return this.http.delete<Persona>(`${environment.api.url}personas/${persona.id}`);
  }
}
