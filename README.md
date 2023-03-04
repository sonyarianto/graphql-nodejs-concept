# graphql-nodejs-concept
Understanding GraphQL sometimes hard and confusing. That's why I create this simple project (using minimal framework and using array to represent database) to learn and understand GraphQL.

In this imaginary project let say we have data of `artists` and `songs`. Songs have relation to artists.

All logic is on `index.js` file, so it should be simple.

After we understand about GraphQL, I think will be easy later if we want to replace the data layer with real connection to database.

## Libraries and tools used (see on `package.json`)

- `express`, as web framework (minimalist) on Node.js
- `express-graphql`, as GraphQL HTTP server middleware
- `graphql`, as JS reference implementation for GraphQL
- `nodemon`, just a tool that helps develop Node.js based applications by automatically restarting the node application when file changes in the directory are detected.

## Sample data

```
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
```

## Query methods

- `songs`, to get all songs
- `song`, to get particular song by id
- `artists`, to get all artists
- `artist`, to get particular song by id


## Mutation methods

- `addSong`, to add new song to array
- `updateSong`, to update particular song by id
- `deleteSong`, to delete particular song by id
- `addArtist`, to add new artist to array
- `updateArtist`, to update particular artist by id
- `deleteArtist`, to delete particular artist by id

## How to run

```
npm run dev
```

Open your browser at http://localhost:5000

## License

MIT

Maintained by Sony Arianto Kurniawan <<sony@sony-ak.com>>
