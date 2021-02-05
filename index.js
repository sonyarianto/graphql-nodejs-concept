// data section

const dataArtists = [
  { id: 1, name: "Peter Cetera" },
  { id: 2, name: "Dewa 19" },
  { id: 3, name: "Tito Soemarsono" },
  { id: 4, name: "Natalie Imbruglia" },
  { id: 5, name: "David Foster" },
  { id: 6, name: "Kahitna" },
]

const dataSongs = [
  { id: 1, title: "One Clear Voice", artistId: 1 },
  { id: 2, title: "Kangen", artistId: 2 },
  { id: 3, title: "Diam-diam", artistId: 3 },
  { id: 4, title: "Torn", artistId: 4 },
  { id: 5, title: "The Best of Me", artistId: 5 },
  { id: 6, title: "Cantik", artistId: 6 },
  { id: 7, title: "Cerita Cinta", artistId: 6 },
]

// application section

const express = require('express')
const expressGraphQL = require('express-graphql').graphqlHTTP
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLList,
  GraphQLInt
} = require('graphql')
const app = express()

const ArtistType = new GraphQLObjectType({
  name: 'Artist',
  description: 'Artists',
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    name: { type: GraphQLNonNull(GraphQLString) },
    songs: { 
      type: GraphQLList(SongType),
      resolve: (parentArtist) => {
        return dataSongs.filter(song => song.artistId === parentArtist.id)
      }
    }
  })
})

const SongType = new GraphQLObjectType({
  name: 'Song',
  description: 'Songs',
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    title: { type : GraphQLNonNull(GraphQLString) },
    artistId: { type: GraphQLNonNull(GraphQLInt) },
    artist: {
      type: ArtistType,
      resolve: (parentSong) => {
        return dataArtists.find(artist => artist.id === parentSong.artistId)
      }
    }
  })
})

const RootQueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'Root Query',
    fields: () => ({
      songs: {
        type: new GraphQLList(SongType),
        description: 'List of all songs',
        resolve: () => dataSongs
      },
      song: {
        type: SongType,
        description: 'Song',
        args: {
          id: { type: GraphQLInt }
        },
        resolve: (parent, args) => dataSongs.find(song => song.id === args.id)
      },
      artists: {
        type: new GraphQLList(ArtistType),
        description: 'List of all artists',
        resolve: () => dataArtists
      },
      artist: {
        type: ArtistType,
        description: 'Artist',
        args: { 
          id: { type: GraphQLInt }
        },
        resolve: (parent, args) => dataArtists.find(artist => artist.id === args.id)
      },
    })
})

const RootMutationType = new GraphQLObjectType({
  name: 'Mutation',
  description: 'Mutation',
  fields: () => ({
    addSong: {
      type: SongType,
      description: 'Add new song',
      args: {
        artistId: { type: GraphQLNonNull(GraphQLInt) },
        title: { type: GraphQLNonNull(GraphQLString) }
      },
      resolve: (parent, args) => { 
          const book = { id: dataSongs.length + 1, title: args.title }
          dataSongs.push(book) 
        }
    }
  })
})

const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType,
})

app.use('/graphql', expressGraphQL({
  schema: schema,
  graphiql: true
}))

app.listen(5000., () => console.log(`Server Running`))