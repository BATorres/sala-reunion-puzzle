export function expandirNodo(evento, objeto) {
  const nodo = objeto.part;
  if (nodo) {
    const diagrama = nodo.diagram;
    diagrama.startTransaction('changeCategory');
    let categoria = diagrama.model.getCategoryForNodeData(nodo.data);
    if (categoria === 'simple') {
      categoria = 'expandido';
    } else {
      categoria = 'simple';
    }
    diagrama.model.setCategoryForNodeData(nodo.data, categoria);
    diagrama.commitTransaction('changeCategory');
  }
}
