const { Router } = require("express");

const gameController = require("../2. Controller/Game");

const gameRouter = Router();

gameRouter.get("/", gameController.index);
gameRouter.get("/:id", gameController.show);
gameRouter.get("/:id/questions", gameController.showQuestions);
gameRouter.post()

module.exports = gameRouter;