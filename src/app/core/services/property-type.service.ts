// property-type.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PropertyType } from '../../models/property-type';

@Injectable({
  providedIn: 'root'
})
export class PropertyTypeService {
  private apiBaseUrl = 'https://wakana.online/api/property-types';

  constructor(private http: HttpClient) {}

  getAll(): Observable<PropertyType[]> {
    return this.http.get<PropertyType[]>(`${this.apiBaseUrl}/all`);
  }

  create(propertyType: PropertyType): Observable<PropertyType> {
    return this.http.post<PropertyType>(`${this.apiBaseUrl}/save`, propertyType);
  }
  getById(id: number): Observable<PropertyType> {
    return this.http.get<PropertyType>(`${this.apiBaseUrl}/${id}`);
  }
  update(propertyType: PropertyType): Observable<PropertyType> {
    return this.http.put<PropertyType>(`${this.apiBaseUrl}/{id}`, propertyType);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiBaseUrl}/delete/${id}`);
  }
}
