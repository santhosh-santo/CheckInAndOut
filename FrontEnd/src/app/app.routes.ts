import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { AdmindashboardComponent } from './admindashboard/admindashboard.component';
import { EmployeeComponent } from './employee/employee.component';
import { authgaurdGuard } from './authgaurd.guard';

export const routes: Routes = [

    { path: "", redirectTo: "/home", pathMatch: "full" },
    { path: "home", component: HomeComponent },
    { path: 'admin', component: AdminComponent },
    {path: "admindashboard", component:AdmindashboardComponent, canActivate:[authgaurdGuard]},
    {path: "employee", component:EmployeeComponent}



];
