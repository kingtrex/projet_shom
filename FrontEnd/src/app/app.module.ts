import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './component/header/header.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TabMetaComponent } from './component/tab_meta/tab_meta.component';
import { TabMaregraphemetaComponent } from './component/tab_maregraphemeta/tab_maregraphemeta.component';
import { ChoixPartenaireComponent } from './component/choix_partenaire/choix_partenaire.component';
import { ChoixMaregrapheComponent } from './component/choix_maregraphe/choix_maregraphe.component';
import { AuthentificationComponent } from './component/authentification/authentification.component';
import { AuthInterceptor } from './auth.interceptor';
import { ReactiveFormsModule } from '@angular/forms';
import { TabPartenaireMaregrapheComponent } from './component/tab_partenairemaregraphe/tab_partenairemaregraphe.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TabMetaComponent,
    TabMaregraphemetaComponent,
    ChoixPartenaireComponent,
    ChoixMaregrapheComponent,
    AuthentificationComponent,
    TabPartenaireMaregrapheComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
