import {diagramaEditable} from "../componentes/PantallaInteractivaEditable/PantallaInteractivaEditable";

export function eliminarNodoOConexion() {
    diagramaEditable.commandHandler.deleteSelection();
}