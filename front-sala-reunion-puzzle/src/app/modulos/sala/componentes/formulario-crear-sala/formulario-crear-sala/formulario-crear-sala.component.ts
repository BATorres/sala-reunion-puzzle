import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {SalaInterface} from '../../../../../interfaces/sala.interface';

@Component({
  selector: 'app-formulario-crear-sala',
  templateUrl: './formulario-crear-sala.component.html',
  styleUrls: ['./formulario-crear-sala.component.css']
})
export class FormularioCrearSalaComponent implements OnInit {

  @Output()
  enviarRegistroValido: EventEmitter<SalaInterface | boolean> = new EventEmitter();

  formularioCrearSala: FormGroup;

  constructor(
    private readonly _formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.formularioCrearSala = this._formBuilder
      .group({
        nombre: new FormControl(
          '',
          [Validators.required],
        ),
        descripcion: new FormControl(
          ''
        )
      });
    this.verificarFormulario();
  }

  private verificarFormulario() {
    this.formularioCrearSala
      .valueChanges
      .subscribe(
        (valoresFormulario: SalaInterface) => {
          const esFormularioValido: boolean = this.formularioCrearSala.valid;
          if (esFormularioValido) {
            this.enviarRegistroValido.emit(valoresFormulario);
          } else {
            this.enviarRegistroValido.emit(false);
          }
        }
      )
  }
}
