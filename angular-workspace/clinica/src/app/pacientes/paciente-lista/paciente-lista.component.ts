import { Component, OnInit, Input } from '@angular/core';
import { Paciente } from '../paciente.model';

@Component({
  selector: 'app-paciente-lista',
  templateUrl: './paciente-lista.component.html',
  styleUrls: ['./paciente-lista.component.css']
})
export class PacienteListaComponent implements OnInit {
  @Input() pacientes = [];

    constructor() {}
    ngOnInit(): void {}
}

