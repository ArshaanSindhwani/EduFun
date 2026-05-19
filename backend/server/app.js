const express = require("express")
const cors = require("cors")
const logger = require("morgan")

const app = express()

app.use(express.json())
app.use(cors())

if (process.env.NODE_ENV !== "test") {
  app.use(logger("dev"))
}

app.get("/", (req, res) => {
  res.send({
    message: "welcome",
    description: "EduFun API"
  })
})

module.exports = app