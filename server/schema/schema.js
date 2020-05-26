const graphql = require("graphql");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLSchema,
} = graphql;

const Movies = require("../models/movie");
const Directors = require("../models/director");
/*
const moviesJson = [
  { "name": "Pulp Fiction", "genre": "Crime", "directorId": "5ecbd011cb39d7f549627fa5" },
  { "name": "1984", "genre": "Sci-Fi", "directorId": "5ecbd049cb39d7f549632b7a" },
  { "name": "V for vendetta", "genre": "Sci-Fi-Thriller", "directorId": "5ecbd066cb39d7f549637ef0" },
  { "name": "Snatch", "genre": "Crime-Comedy", "directorId": "5ecbd07dcb39d7f54963c1b4" },
  { "name": "Reservoir Dogs", "genre": "Crime", "directorId": "5ecbd011cb39d7f549627fa5" },
  { "name": "The Hateful Eight", "genre": "Crime", "directorId": "5ecbd011cb39d7f549627fa5" },
  { "name": "Inglorious Basterds", "genre": "Crime", "directorId": "5ecbd011cb39d7f549627fa5" },
  {
    "name": "Lock, Stock and Two Smocking Barrels",
    "genre": "Crime-Comedy",
    "directorId": "5ecbd07dcb39d7f54963c1b4",
  },
];

const movies = [
  { id: 1, name: "Pulp Fiction", genre: "Crime", directorId: 1 },
  { id: 2, name: "1984", genre: "Sci-Fi", directorId: 2 },
  { id: 3, name: "V for vendetta", genre: "Sci-Fi-Thriller", directorId: 3 },
  { id: 4, name: "Snatch", genre: "Crime-Comedy", directorId: 4 },
  { id: 5, name: "Reservoir Dogs", genre: "Crime", directorId: 1 },
  { id: 6, name: "The Hateful Eight", genre: "Crime", directorId: 1 },
  { id: 7, name: "Inglorious Basterds", genre: "Crime", directorId: 1 },
  {
    id: 8,
    name: "Lock, Stock and Two Smocking Barrels",
    genre: "Crime-Comedy",
    directorId: 4,
  },
];

const directorsJson = [
  { "name": "Quentin Tarantino", "age": 55 }, //5ecbd011cb39d7f549627fa5
  { "name": "Michael Redford", "age": 72 }, //5ecbd049cb39d7f549632b7a
  { "name": "James McTeigue", "age": 51 }, //5ecbd066cb39d7f549637ef0
  { "name": "Cuy Richie", "age": 50 }, //5ecbd07dcb39d7f54963c1b4
];

const directors = [
  { id: 1, name: "Quentin Tarantino", age: 55 },
  { id: 2, name: "Michael Redford", age: 72 },
  { id: 3, name: "James McTeigue", age: 51 },
  { id: 4, name: "Cuy Richie", age: 50 },
];
*/

const MovieType = new GraphQLObjectType({
  name: "Movie",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    director: {
      type: DirectorType,
      resolve(parent, args) {
        //return directors.find((director) => director.id == parent.directorId);
        return Directors.findById(parent.directorId);
      },
    },
  }),
});

const DirectorType = new GraphQLObjectType({
  name: "Director",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    movies: {
      type: new GraphQLList(MovieType),
      resolve(parent, args) {
        //return movies.filter((movie) => movie.directorId === parent.id);
        return Movies.find({ directorId: parent.id });
      },
    },
  }),
});

const Query = new GraphQLObjectType({
  name: "Query",
  fields: {
    movie: {
      type: MovieType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Movies.findById(args.id);
      },
    },
    director: {
      type: DirectorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Directors.findById(args.id);
      },
    },
    movies: {
      type: new GraphQLList(MovieType),
      resolve(parent, args) {
        return Movies.find({});
      },
    },
    directors: {
      type: new GraphQLList(DirectorType),
      resolve(parent, args) {
        return Directors.find({});
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: Query,
});
