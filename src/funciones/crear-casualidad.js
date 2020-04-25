import * as go from 'gojs';

export function crearCasualidad(graphObject) {
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
                stroke: 'blue',
                strokeWidth: 2
            }
        ),
        graphObject(
            go.Shape,
            {
                stroke: 'blue',
                strokeWidth: 2,
                toArrow: 'OpenTriangle'
            }
        ),
        graphObject(
            go.TextBlock,
            {
                text: '',
                editable: true
            },
            new go.Binding(
                'text',
                'key',
            ).makeTwoWay()
        )
    )
}
