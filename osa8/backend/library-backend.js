const { ApolloServer, UserInputError, gql } = require('apollo-server')
const mongoose = require('mongoose')
const Book = require('./models/book')
const Author = require('./models/author')
const config = require('./utils/config')

mongoose.set('useFindAndModify', false)

//const MONGODB_URI = 'mongodb+srv://fullstack:sekred@cluster0-ostce.mongodb.net/graphql?retryWrites=true'

console.log('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = gql`

  type User {
    username: String!
    id: ID!
  }

  type Token {
    value: String!
  }  
  
  type Author {
    name: String!
    born: Int
    bookCount: Int
    id: ID!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID! 
  }
  
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    findBook(title: String!): Book
    findAuthor(name: String!): Author
    me: User
  }
  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String]
    ): Book,
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author,
    createUser(
      username: String!
    ): User,
    login(
      username: String!
      password: String!
    ): Token
  }
`


/*
mutation {
  addBook(title:"Sook-En Park",author:"Suki Suki",published:2023){
    title
    id
  }
}
*/

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: (root, args) => {
      let params = {}
      if (args.author) {
        params.author = args.author
      }
      if (args.genre) {
        params.genres = { $in: args.genre }
      }
      return Book.find(params)
    },
    allAuthors: () => {
      const res = Author.find({})
      console.log(res)
      return res
    },
    findBook: (root, args) =>
      Book.findOne({ title: args.title }),
    findAuthor: (root, args) =>
      Author.findOne({ name: args.name })
  },

  /*

  */
  Mutation: {
    editAuthor: async (root, args) => {
      const author = await Author.findOne({ name: args.name })
      author.born = args.setBornTo
      try {
        await author.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      return author
    },
    addBook: async (root, args) => {
      let id = ''
      const author = await Author.findOne({ name: args.author })
      console.log('Author: ', author)

      if (!author) {
        const newAuthor = new Author({ name: args.author })
        const res = await newAuthor.save()
        console.log(res)
        id = res.id
      } else {
        id = author.id
      }

      const book = new Book({ ...args, author: id })
      try {
        await book.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }


      return book
    }
  },
  Author: {
    bookCount: async (root) => {
      const books = await Book.find({ author: root.id })
      return books.length
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})

/*

8.14: Tietokanta, osa 2
Täydennä sovellusta siten, että kaikki kyselyt (paitsi kyselyn allBooks parametri author) sekä mutaatiot toimivat.

Saatat tässä tehtävässä hyötyä tästä.

8.15 Tietokanta, osa 3
Täydennä sovellusta siten, että tietokannan validointivirheet (esim. liian lyhyt kirjan tai kirjailijan nimi) käsitellään järkevästi, eli niiden seurauksena heitetään poikkeus UserInputError, jolle asetetaan sopiva virheviesti.

8.16 käyttäjä ja kirjautuminen
Lisää järjestelmään käyttäjienhallinta. Laajenna skeemaa seuraavasti:

type User {
  username: String!
  favoriteGenre: String!
  id: ID!
}

type Token {
  value: String!
}

type Query {
  // ..
  me: User
}

type Mutation {
  // ...
  createUser(
    username: String!
    favoriteGenre: String!
  ): User
  login(
    username: String!
    password: String!
  ): Token
}
Toteuta uuden queryn me sekä uusien mutaatioiden createUser ja login resolverit. Voit olettaa tämän luvun materiaalin tapaan, että kaikilla käyttäjillä on sama, kovakoodattu salasana.

Tee mutaatiot addBook ja editAuthor mahdollisiksi ainoastaan, jos pyynnön mukana lähetetään validi token.
*/