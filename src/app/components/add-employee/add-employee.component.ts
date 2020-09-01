import { AlertifyService } from './../../services/alertify.service';
import { EmployeeService } from './../../services/employee-service.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Employee } from 'src/app/models/Employee';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html'
})
export class AddEmployeeComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  status = 'Add';
  constructor(private fb: FormBuilder, private empService: EmployeeService,
              private route: ActivatedRoute, private alertify: AlertifyService) {
  }

  ngOnInit() {
    this.createForm();
    this.route.paramMap.subscribe(param => {
      const empId = +param.get('id');
      if (empId && empId > 0) {
        // update logic and fill the form
        this.getEmployee(empId);
        this.status = 'Update';

      }
    });
  }

  createForm() {
    this.registerForm = this.fb.group({
      id: [''],
      employee_name: ['', Validators.required],
      employee_salary: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      employee_age: ['', [Validators.required, Validators.pattern('^[0-9]*$')]]
    });
  }

  get f() { return this.registerForm.controls; }

  AddEmployee() {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }
    // Send to Service
    if (this.status.toLowerCase() === 'update') {
      this.empService.updateEmployee(JSON.stringify(this.registerForm.value))
        .subscribe((res) => {
          this.alertify.success('Updation successful!');
        }, error => {
          this.alertify.error(error.error.message);
        });
    } else {
      this.empService.createEmployee(JSON.stringify(this.registerForm.value)).subscribe((res) => {
        this.alertify.success('Employee created successfully!');
      }, error => {
        this.alertify.error(error.error.message);
      });
    }
  }

  getEmployee(id: number) {
    this.empService.getEmployeeById(id).subscribe((res: Employee) => {
      this.setFormValues(res);
    });
  }

  ResetForm() {
    this.registerForm.reset();
  }

  private setFormValues(employee: any) {
    this.registerForm.setValue({
      id: employee.data.id,
      employee_name: employee.data.employee_name,
      employee_salary: employee.data.employee_salary,
      employee_age: employee.data.employee_age
    });
  }
}
