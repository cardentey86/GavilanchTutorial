import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { MaterialModule } from './app.material';
import { PersonasComponent } from './personas/personas.component';
import {RouterConfig} from './route-config';
import {RouterModule} from '@angular/router';
import { MenuComponent } from './shared/menu/menu.component';
import { SidenavComponent } from './shared/sidenav/sidenav.component';
import {PersonaService} from './personas/persona.service';
import {HttpClientModule} from '@angular/common/http';
import { DeletePersonaComponent } from './personas/delete-persona/delete-persona.component';
import { PersonasFormComponent } from './personas/personas-form/personas-form.component';
import {MatNavList} from '@angular/material';
import { DialogComponent } from './shared/dialog/dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    PersonasComponent,
    MenuComponent,
    SidenavComponent,
    DeletePersonaComponent,
    PersonasFormComponent,
    DialogComponent,

  ],
  imports: [
    BrowserModule,
    MaterialModule,
      RouterModule.forRoot(RouterConfig),
      FormsModule,
      HttpClientModule,
      ReactiveFormsModule,
  ],
  entryComponents: [DialogComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
