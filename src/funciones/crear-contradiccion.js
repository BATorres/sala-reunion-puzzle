import * as go from 'gojs';

export function crearContradiccion(graphObject) {
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
                stroke: 'red'
            },
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
