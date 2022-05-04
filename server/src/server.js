const path = require('path')

const cors = require('cors')
const express = require('express')
const dotenv = require('dotenv').config({path: path.resolve(__dirname, '../../.env') })
const favicon = require('serve-favicon')
const jwt = require('jsonwebtoken')
const { MongoClient, ObjectId } = require('mongodb')

const DATABASE_URL = process.env.DATABASE_URL
const PORT = process.env.PORT || 3001
const JWT_KEY = process.env.JWT_KEY

const app = express()
app.use(cors({origin: true}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.resolve(__dirname, '../../client/dist')))
app.use(favicon(path.resolve(__dirname, '../../client/src/assets/favicon.ico')))
app.listen(PORT, () => console.log(`Listening on ${PORT}`))

MongoClient.connect(DATABASE_URL)
.then(client => {
  const booksDB = client.db('booksDB')
  const usersDB = client.db('usersDB')

  const isAuthenticated = (req, res, next) => {
    const authHeader = req.headers.authorization
    if(!authHeader) return res.status(403).send({ message: 'This action requires authentication. Please log in.' })

    const token = authHeader.split(' ')[1]
    jwt.verify(token, JWT_KEY, (err, user) => {
      if(err) return res.status(403).send({ message: 'Access token is not valid.' })

      req.user = user
      next()
    })
  }

  app.post('/authentication', (req, res) => {
    const { username, password } = req.body

    usersDB.collection('users').find({ username: username, password: password }).toArray((err, results) => {
      const user = results[0]

      if(!user) {
        return res.status(400).send({ message: 'Invalid login.' })
      }
      
      const accessToken = jwt.sign({}, JWT_KEY, { expiresIn: '60m' })
      return res.send({ accessToken, username: username })
    })
  })

  app.post('/users', (req, res) => {
    const { username, password } = req.body

    if(!username || !password) return res.status(400).send({ message: 'Please provide a username and password for the new user.' })

    return usersDB.collection('users').insertOne({ username: username, password: password }).then(results => res.send(results))
  })

  app.get('/books', (req, res) => {
    const { name, action } = req.query
    if(action === 'getTwoRandoms') {
      booksDB.collection('books').aggregate([{$sample: {size: 2}}]).toArray((err, results) => {
        return res.send(results)
      })
    }

    else if (name) {
      booksDB.collection('books').find({ name: name }).toArray((err, results) => {
        return res.send(results)
      })
    }

    else {
      booksDB.collection('books').find().sort({ rating: -1 }).toArray((err, results) => {
        return res.send(results)
      })
    }
  })

  app.get('*', (req, res) => {
    return res.sendFile(path.join(__dirname, '../../client/dist', 'index.html'))
  })

  app.post('/books', isAuthenticated, (req, res) => {
    const { name, image, rating } = req.body
    if(!name || !image || !rating) return res.status(400).send({ message: 'Please include a name, image, and initial rating for the book being created.' })

    return booksDB.collection('books').insertOne({ name: name, image: image, rating: rating}).then(results => res.send(results))
  })

  app.patch('/books/:id', (req, res) => {
    const { rating } = req.body
    if(!rating) return res.status(400).send({ message: 'Please include an updated rating for the book being patched.' })

    return booksDB.collection('books').updateOne({_id: ObjectId(req.params.id)}, {$set: {rating: rating}}).then(results => res.send(results))
  })

  app.delete('/books/:id', isAuthenticated, (req, res) => {
    return booksDB.collection('books').deleteOne({_id: ObjectId(req.params.id)}).then(results => res.send(results))
  })
})
