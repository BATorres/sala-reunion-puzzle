import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-formulario-crear-sala',
  templateUrl: './formulario-crear-sala.component.html',
  styleUrls: ['./formulario-crear-sala.component.css']
})
export class FormularioCrearSalaComponent implements OnInit {

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
  }

  crearSala() {
    const nombre:string = this.formularioCrearSala.get('nombre').value;
    const descripcion:string = this.formularioCrearSala.get('descripcion').value;
    console.log('datos', nombre, descripcion)
  }
}
