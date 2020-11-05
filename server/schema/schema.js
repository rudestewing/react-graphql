const graphql = require('graphql');
const { GraphQLObjectType } = graphql; 

const Book = require('../models/book');
const Author = require('../models/author');
const author = require('../models/author');

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
                    return Author.findById(parent.authorId);
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
            books: {
                type: new graphql.GraphQLList(BookType),
                resolve(parent, args) {
                    return Book.find({authorId: args.id});
                }
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addAuthor: {
            type: AuthorType,
            args: {
                name: {
                    type: graphql.GraphQLString,
                },
                age: {
                    type: graphql.GraphQLInt
                },
            },
            resolve(parent, args) {
                let author = new Author({
                    name: args.name,
                    age: args.age      
                });
                return author.save();
            }
        },
        addBook: {
            type: BookType,
            args: {
                name: {
                    type: graphql.GraphQLString,
                },
                genre: {
                    type: graphql.GraphQLString
                },
                authorId: {
                    type: graphql.GraphQLID
                }
            },
            resolve(parent, args) {
                let {name, genre, authorId} = args;

                let book = new Book({
                    name,
                    genre,
                    authorId    
                });

                return book.save();
            }
        }
    }
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        books: {
            type: new graphql.GraphQLList(BookType),
            resolve(parent, args) {
                return Book.find();
            }
        },
        authors: {
            type: new graphql.GraphQLList(AuthorType),
            resolve(parent, args) {
                return Author.find();
            }
        },
        book: {
            type: BookType,
            args: {
                id: {
                    type: graphql.GraphQLID
                },
            },
            resolve(parent, args) {
                return Book.findById(args.id);
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
                return Author.findById(args.id);
            }
        }

    }
});

module.exports = new graphql.GraphQLSchema({
    query: RootQuery,
    mutation: Mutation,
})