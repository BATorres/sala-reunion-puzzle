import {diagramaEditable} from '../componentes/diagrama-editable/diagrama-editable/diagrama-editable.component';

export function eliminarNodoOConexion(): any {
  diagramaEditable.commandHandler.deleteSelection();
}
