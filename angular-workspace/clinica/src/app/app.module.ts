import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PacienteInserirComponent } from './pacientes/pacientes-inserir/paciente-inserir.component';
import { CabecalhoComponent } from './cabecalho/cabecalho.component';
import { PacienteListaComponent } from './pacientes/paciente-lista/paciente-lista.component';


@NgModule({
  declarations: [
    AppComponent, PacienteInserirComponent, CabecalhoComponent, PacienteListaComponent, PacienteListaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
