const express = require('express');
const app = express();
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');

app.use(cors());
mongoose.connect('mongodb://localhost:27017/reactgraphql', {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connection.once('open', () => {
    console.log('connected to mongodb');
});

const { graphqlHTTP } = require('express-graphql');

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true,
}));

app.listen(4000, () => {
    console.log('now listening request on port 4000');
});

