const graphql = require('graphql');
const { GraphQLObjectType } = graphql; 
const _ = require('lodash');


// dummy
const books = [
    {
        id: '1',
        name: 'Name of the wind',
        genre: 'Fantasy',
        authorId: 1,
    },
    {
        id: '2',
        name: 'Harry Potter',
        genre: 'Fantasy',
        authorId: 1,
    },
    {
        id: '3',
        name: 'The Hobbits',
        genre: 'Fantasy',
        authorId: 2,
    },
    {
        id: '4',
        name: 'In the heart of the sea',
        genre: 'Fantasy',
        authorId: 3,
    },
]

const authors = [
    {
        id: '1',
        name: 'Jack Sparrow',
    },
    {
        id: '2',
        name: 'Johnson',
    },
    {
        id: '3',
        name: 'Nobita K',
    },
]

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => {
        return {
            id: {
                type: graphql.GraphQLID,
            },
            name: {
                type: graphql.GraphQLString,
            },
            genre: {
                type: graphql.GraphQLString
            },
            author: {
                type: AuthorType,
                resolve(parent, args) {
                    console.log(parent, args);
                    return _.find(authors, {id: parent.authorId})
                }
            }
        }
    }
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => {
        return {
            id: {
                type: graphql.GraphQLID,
            },
            name: {
                type: graphql.GraphQLString
            },
        }
    }
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: {
                id: {
                    type: graphql.GraphQLID
                },
            },
            resolve(parent, args) {
                // args.id
                // code to get data from db or other source
                return _.find(books, {
                    id: args.id
                })
            }
        },

        author: {
            type: AuthorType,
            args: {
                id: {
                    type: graphql.GraphQLID
                },
            },
            resolve(parent, args) {
                return _.find(authors, {id: args.id});
            }
        }

    }
});

module.exports = new graphql.GraphQLSchema({
    query: RootQuery
})