import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from '../guards/auth.guard';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PerfilComponent } from './perfil/perfil.component';


//Mantenimientos
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { ClinicasComponent } from './mantenimientos/clinicas/clinicas.component';
import { DoctoresComponent } from './mantenimientos/doctores/doctores.component';
import { DoctorComponent } from './mantenimientos/doctores/doctor.component';
//Principal
import { ClientesComponent } from './clientesmantenimientos/clientes/clientes.component';
import { CitasComponent } from './clientesmantenimientos/citas/citas.component';
const routes: Routes = [
//<!-- * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * -->
//<!-- * * * * * * * * * * * Rutas hijas* * * * * * * * * * * * *  * -->
{path: 'dashboard', 
component:PagesComponent,
canActivate: [AuthGuard],
children:[
  {path: '', component:DashboardComponent, data:{ titulo : 'Dashboard'} },
  //{path: 'progress',  component:ProgressComponent, data:{ titulo : 'ProgressBar'}   },
  {path: 'citas',  component:CitasComponent, data:{ titulo : 'Gestión citas'}},
  {path: 'clientes',  component:ClientesComponent, data:{ titulo : 'Gestión pacientes'}},
 // {path: 'grafica1',  component:Grafica1Component , data:{ titulo : 'Graficas'} },
 {path: 'account-settings',  component:AccountSettingsComponent, data:{ titulo : 'Ajuste-cuesta'} },
 // {path: 'promesas',  component:PromesasComponent , data:{ titulo : 'Promesas'} },
 // {path: 'rxjs',  component:RxjsComponent , data:{ titulo : 'Rxjs'} },
 {path: 'perfil',  component:PerfilComponent , data:{ titulo : 'Perfil de usuario'} },
   //MANTENIMIENTOS 
  {path: 'usuarios',  component:UsuariosComponent , data:{ titulo : 'Gestión usuarios '} },
  {path: 'clinicas',  component:ClinicasComponent , data:{ titulo : 'Gestión clinicas'} },
  {path: 'doctores',  component:DoctoresComponent , data:{ titulo : 'Gestión doctores'} },
  {path: 'doctor/:id', component:DoctorComponent , data:{ titulo : 'Gestión doctores'} },

]
}, 
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModules {}
