import { ChartComponent } from './components/chart/chart.component';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import { EmployeesListComponent } from './components/employees-list/employees-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', component: AddEmployeeComponent },
  { path: 'list', component: EmployeesListComponent },
  { path: 'add', component: AddEmployeeComponent },
  { path: 'edit/:id', component: AddEmployeeComponent },
  { path: 'chart', component: ChartComponent },
  { path: '**', redirectTo: 'add', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
