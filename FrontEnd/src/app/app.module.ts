import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './component/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { TabMetaComponent } from './component/tab_meta/tab_meta.component';
import { TabMaregraphemetaComponent } from './component/tab_maregraphemeta/tab_maregraphemeta.component';
import { TabPartenaireComponent } from './component/tab-partenaire/tab-partenaire.component';
import { ChoixMaregrapheComponent } from './component/choix_maregraphe/choix_maregraphe.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TabMetaComponent,
    TabMaregraphemetaComponent,
    TabPartenaireComponent,
    ChoixMaregrapheComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
