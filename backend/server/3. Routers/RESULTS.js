const { Router } = require("express")

const resultsController = require("../2. Controller/Results")

const resultsRouter = Router()

resultsRouter.get("/", resultsController.index)
resultsRouter.get("/:id", resultsController.show)
resultsRouter.post("/", resultsController.create)

module.exports = resultsRouter