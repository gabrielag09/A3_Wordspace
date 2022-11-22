import { Component, EventEmitter, Output } from '@angular/core';
import { Paciente } from '../paciente.model';

@Component({
selector: 'app-paciente-inserir',
templateUrl: './paciente-inserir.component.html',
styleUrls: ['./paciente-inserir.component.css'],
})
export class PacienteInserirComponent {
@Output() pacienteAdicionado = new EventEmitter<Paciente>();
nome: string;
fone: string;
email: string;
onAdicionarPaciente() {
    if (form.invalid) {
        return;
        }
const paciente: Paciente = {
    nome: form.value.nome,
    fone: form.value.fone,
    email: form.value.email,
};
    this.pacienteAdicionado.emit(paciente);

console.log('inserindo Paciente...');
}
}
