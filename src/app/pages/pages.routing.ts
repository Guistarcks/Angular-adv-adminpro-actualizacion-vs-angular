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
const routes: Routes = [
//<!-- * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * -->
//<!-- * * * * * * * * * * * Rutas hijas* * * * * * * * * * * * *  * -->
{path: 'dashboard', 
component:PagesComponent,
canActivate: [AuthGuard],
children:[
  {path: '', component:DashboardComponent, data:{ titulo : 'Dashboard'} },
  {path: 'progress',  component:ProgressComponent, data:{ titulo : 'ProgressBar'}   },
  {path: 'grafica1',  component:Grafica1Component , data:{ titulo : 'Graficas'} },
  {path: 'account-settings',  component:AccountSettingsComponent, data:{ titulo : 'Ajuste-cuesta'} },
  {path: 'promesas',  component:PromesasComponent , data:{ titulo : 'Promesas'} },
  {path: 'rxjs',  component:RxjsComponent , data:{ titulo : 'Rxjs'} },
  {path: 'perfil',  component:PerfilComponent , data:{ titulo : 'Perfil de usuario'} },
  {path: 'usuarios',  component:UsuariosComponent , data:{ titulo : 'Usuario de aplicación'} },



]
}, 
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModules {}
