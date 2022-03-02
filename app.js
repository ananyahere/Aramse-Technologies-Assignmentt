const express = require('express')
const mongoose = require("mongoose")
const userRouter = require('./routes/user')

require('dotenv').config()
const PORT = process.env.PORT || 3000
const app = express()

app.use(express.json())
app.use(express.urlencoded())

app.use(userRouter)

app.get("/", (req, res) => {
  res.send("Welcome. I am Ananya Sharma.")
})

// database connection
mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => {
    console.log('mongoose connected')
    app.listen(PORT, () => {
      console.log(`Listening at port ${PORT}`);
    })
  }
  )
  .catch((err) => console.log(err));