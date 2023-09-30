// Die Module
const express = require('express')
const mongoose = require('mongoose')

const app = express()

// Middleware
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Link zur Verbindung mit MongoDB
const uri = "mongodb+srv://flamur:12345@cluster0.axyol2u.mongodb.net/?retryWrites=true&w=majority"

// Code zur Verbindung mit MongoDB
async function connect() {
  try {
    await mongoose.connect(uri)
    console.log("Verbunden mit Flamurs MongoDB")
  } catch (error) {
    console.error(error)
  }}

// Die Verbindung mit MongoDB
connect()

// Die Startseite
app.get("/", (req, res) => {
    res.send('<a href="/register">Zur Registrierung</a><a href="/login">Zum Login</a>')
  })
  
  // login.html mit dem Server verbinden. 
  app.get("/login", function (req, res) {
    res.sendFile("login.html", { root: "./" })
  })
  
  // register.html mit dem Server verbinden.
  app.get("/register", function (req, res) {
    res.sendFile("register.html", { root: "./" })
  })
  
  // "User" erstellen mit MongoDB
  const User = mongoose.model("User", {
    username: String,
    password: String,
  })
  
  // Registrierung von "User"
  app.post("/register", async (req, res) => {
    const { username, password } = req.body
    await User.create({ username, password });
    res.send('<p>Registrierung erfolgreich.</p><a href="/login">Zum Login.</a>')
  })
  
  // Login von "User"
  app.post("/login", async (req, res) => {
    const { username, password } = req.body
    const user = await User.findOne({ username, password })
    if (user) {
      res.send("Login erfolgreich.")
    } else {
      res.send("Falscher Benutzername oder Passwort.")
    }
  })

  // Port für den Start des Servers
  app.listen(3000, () => {
    console.log("App wurde gestartet auf localhost:3000")
  })