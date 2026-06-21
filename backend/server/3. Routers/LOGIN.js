const { Router } = require("express")

const loginController = require("../2. Controller/Login")

const loginRouter = Router()

loginRouter.get("/:name", loginController.show)
loginRouter.post("/register", loginController.create)
loginRouter.post("/login", loginController.login)

module.exports = loginRouter