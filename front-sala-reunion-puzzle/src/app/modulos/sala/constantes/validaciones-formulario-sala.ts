import {Validators} from '@angular/forms';

export const VALIDACIONES_NOMBRE_SALA = [
  Validators.required,
  Validators.minLength(3),
  Validators.maxLength(60)
];

export const MENSAJES_VALIDACION_NOMBRE_SALA = {
  required: 'El campo Nombre es obligatorio',
  minlength: 'El campo Nombre debe tener como mínimo 3 caracteres',
  maxlength: 'El campo Nombre no debe tener más de 60 caracteres'
};
