import * as go from 'gojs';

export function crearConexion(graphObject): any {
  return graphObject(
    go.Link,
    {
      relinkableFrom: true,
      relinkableTo: true,
      routing: go.Link.AvoidsNodes
    },
    graphObject(
      go.Shape,
      {
        strokeWidth: 2,
      },
    )
  );
}
