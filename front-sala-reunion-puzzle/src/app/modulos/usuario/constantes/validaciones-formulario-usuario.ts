import {Validators} from '@angular/forms';

export const VALIDACIONES_NOMBRE_USUARIO = [
  Validators.required,
  Validators.minLength(3),
  Validators.maxLength(40)
];

export const MENSAJES_VALIDACION_NOMBRE_USUARIO = {
  required: 'El campo Nombre es obligatorio',
  minlength: 'El campo Nombre debe tener como mínimo 3 caracteres',
  maxlength: 'El campo Nombre no debe tener más de 40 caracteres'
};

export const VALIDACIONES_PASSWORD_USUARIO = [
  Validators.required,
];

export const MENSAJES_VALIDACION_PASSWORD_USUARIO = {
  required: 'El campo Contraseña es obligatorio',
};
