import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Employee } from '../models/Employee';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private headers: HttpHeaders;

  constructor(private httpClient: HttpClient) {
    this.headers = new HttpHeaders();
    this.headers.append('contentType', 'application/json');
  }

  public getEmployees(): Observable<Employee[]> {
    return this.httpClient.get<Employee[]>(environment.apiUrl + 'employees');
  }
  public getEmployeeById(id: number): Observable<Employee> {
    return this.httpClient.get<Employee>(environment.apiUrl + `employee/${id}`);
  }

  public deleteEmployee(id: number) {
    return this.httpClient.delete(environment.apiUrl + `delete/${id}`);
  }

  public createEmployee(employee: any) {
    return this.httpClient.post(environment.apiUrl + 'create', employee);
  }

  public updateEmployee(employee: any) {
    return this.httpClient.put(environment.apiUrl + `update/${employee.id}`, employee);
  }
}
