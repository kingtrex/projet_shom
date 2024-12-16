import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './auth.guard';
import { AuthentificationComponent } from './component/authentification/authentification.component';

import { ChoixPartenaireComponent } from './component/choix_partenaire/choix_partenaire.component';
import { TabPartenaireMaregrapheComponent } from './component/tab_partenairemaregraphe/tab_partenairemaregraphe.component';

import { ChoixMaregrapheComponent } from './component/choix_maregraphe/choix_maregraphe.component';
import { TabMaregraphemetaComponent } from './component/tab_maregraphemeta/tab_maregraphemeta.component';

import { TabMetaComponent } from './component/tab_meta/tab_meta.component';


const routes: Routes = [
  {path : "", component: AuthentificationComponent},

  {path : "tabChoixPartenaire", component: ChoixPartenaireComponent, canActivate: [AuthGuard]},
  {path : "tabPartenaireMaregraphe/:id", component: TabPartenaireMaregrapheComponent, canActivate: [AuthGuard]},

  {path : "tabChoixMaregraphe", component: ChoixMaregrapheComponent, canActivate: [AuthGuard]},
  {path : "tabMaregrapheMeta/:id/:ville", component: TabMaregraphemetaComponent, canActivate: [AuthGuard]},
  
  {path : "tabMeta", component: TabMetaComponent, canActivate: [AuthGuard]},
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
