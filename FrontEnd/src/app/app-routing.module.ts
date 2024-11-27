import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabMetaComponent } from './component/tab_meta/tab_meta.component';
import { TabMaregraphemetaComponent } from './component/tab_maregraphemeta/tab_maregraphemeta.component';
import { ChoixMaregrapheComponent } from './component/choix_maregraphe/choix_maregraphe.component';
import { AuthentificationComponent } from './component/authentification/authentification.component';

const routes: Routes = [
  {path : "", component: AuthentificationComponent},
  {path : "tabMeta", component: TabMetaComponent},
  {path : "tabMaregrapheMeta/:id", component: TabMaregraphemetaComponent},
  {path : "tabChoixMaregraphe", component: ChoixMaregrapheComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
