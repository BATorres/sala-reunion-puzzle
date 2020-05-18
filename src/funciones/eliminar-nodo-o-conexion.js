import {diagramaEditable} from "../componentes/DiagramaEditable/DiagramaEditable";

export function eliminarNodoOConexion() {
    diagramaEditable.commandHandler.deleteSelection();
}