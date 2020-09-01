import { AlertifyService } from './../../services/alertify.service';
import { Employee, APIResponse } from './../../models/Employee';
import { EmployeeService } from './../../services/employee-service.service';
import { Component, OnInit } from '@angular/core';
import { error } from 'protractor';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html'
})
export class EmployeesListComponent implements OnInit {
  employees: any;
  APIResponse: any;
  constructor(private employeeService: EmployeeService, private alertify: AlertifyService) { }

  ngOnInit() {
    this.getEmployees();
  }

  getEmployees() {
    this.employeeService.getEmployees()
      .subscribe((response: Employee[]) => {
        this.APIResponse = response;
        this.employees = this.APIResponse.data;
      // tslint:disable-next-line: no-shadowed-variable
      }, error => {
        this.alertify.error(error.error.message);
      });
  }

  deleteEmployee(id: number) {
    this.employeeService.deleteEmployee(id)
      .subscribe(response => {
        this.alertify.success('Employee deleted successfully!');
      }, // tslint:disable-next-line: no-shadowed-variable
        error => {
          this.alertify.error(error.error.message);
        });
  }
}
