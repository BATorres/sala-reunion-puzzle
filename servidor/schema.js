const {GraphQLObjectType, GraphQLSchema, GraphQLString} = require("graphql");

module.exports = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Query',
        fields: ({
            message: {
                type: GraphQLString,
                resolve() {
                    return 'Funciona esta wea';
                }
            }
        })
    })
});
