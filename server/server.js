require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const {SERVER_PORT} = process.env

const {seed} = require('./seed.js')
const {getTrails, getPictures, login, getMeets, getFavorites, getCompleted, getUserInfo, key, updateKey, createMeet, favoriteMeet, getFavoritedMeets, completeTrail, deleteCompleted, deleteFavorite, favoriteTrail, createUser} = require('./controller.js')

app.use(express.json())
app.use(cors())

app.use(express.static(`${__dirname}../public`))

console.log(__dirname + '../public')

// DEV
app.post('/seed', seed)

// TRAILS
app.get('/trails', getTrails)
app.get('/pictures', getPictures)
app.post('/favoriteTrail/:id', favoriteTrail)

// LOGIN
app.get('/login', login)
app.get('/key', key)
app.put('/key', updateKey)
app.post('/user', createUser)

// PROFILE
app.get('/favoritedmeets', getFavoritedMeets)
app.get('/favorites', getFavorites)
app.get('/completed', getCompleted)
app.get('/userInfo', getUserInfo)
app.post('/completeTrail/:id', completeTrail)
app.delete('/favorite/:id', deleteFavorite)
app.delete('/completed/:id', deleteCompleted)

// MEETS
app.get('/meets', getMeets)
app.post('/meets', createMeet)
app.post('/favoriteMeet/:id', favoriteMeet)











app.listen(SERVER_PORT, () => console.log(`up on ${SERVER_PORT}`))