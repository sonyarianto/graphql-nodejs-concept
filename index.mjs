import { createYoga } from 'graphql-yoga'
import { createServer } from 'http'
import { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLList, GraphQLInt } from 'graphql'

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

const ArtistType = new GraphQLObjectType({
  name: 'Artist',
  description: 'Artists',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLInt) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    songs: { 
      type: new GraphQLList(SongType),
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
    id: { type: new GraphQLNonNull(GraphQLInt) },
    title: { type : new GraphQLNonNull(GraphQLString) },
    artistId: { type: new GraphQLNonNull(GraphQLInt) },
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
        description: 'Songs',
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
        description: 'Artists',
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
      description: 'Add song',
      args: {
        artistId: { type: new GraphQLNonNull(GraphQLInt) },
        title: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve: (parent, args) => { 
          const song = { id: dataSongs.length + 1, title: args.title }
          dataSongs.push(song)
          return song 
        }
    },
    updateSong: {
      type: SongType,
      description: 'Update song',
      args: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
        title: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve: (parent, args) => {
        const song = dataSongs.find(song => song.id === args.id)
        song.title = args.title
        return song
      }
    },
    deleteSong: {
      type: SongType,
      description: 'Delete song',
      args: {
        id: { type: new GraphQLNonNull(GraphQLInt) }
      },
      resolve: (parent, args) => {
        const song = dataSongs.find(song => song.id === args.id)
        dataSongs.splice(dataSongs.indexOf(song), 1)
        return song
      }
    },
    addArtist: {
      type: ArtistType,
      description: 'Add artist',
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve: (parent, args) => { 
          const artist = { id: dataArtists.length + 1, name: args.name }
          dataArtists.push(artist)
          return artist
        }
    },
    updateArtist: {
      type: ArtistType,
      description: 'Update artist',
      args: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
        name: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve: (parent, args) => {
        const artist = dataArtists.find(artist => artist.id === args.id)
        artist.name = args.name
        return artist
      }
    },
    deleteArtist: {
      type: ArtistType,
      description: 'Delete artist',
      args: {
        id: { type: new GraphQLNonNull(GraphQLInt) }
      },
      resolve: (parent, args) => {
        const artist = dataArtists.find(artist => artist.id === args.id)
        dataArtists.splice(dataArtists.indexOf(artist), 1)
        return artist
      }
    }
  })
})

const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType,
})

// server section

const yoga = createYoga({ schema })
const server = createServer(yoga)
server.listen(5000, () => {
  console.info('GraphQL server running!. Open http://localhost:5000/graphql to run queries!')
})