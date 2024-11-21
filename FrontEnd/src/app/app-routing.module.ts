import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabMetaComponent } from './component/tab_meta/tab_meta.component';
import { TabMaregraphemetaComponent } from './component/tab_maregraphemeta/tab_maregraphemeta.component';

const routes: Routes = [
  {path : "tabMeta", component: TabMetaComponent},
  {path : "tabMaregrapheMeta", component: TabMaregraphemetaComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
