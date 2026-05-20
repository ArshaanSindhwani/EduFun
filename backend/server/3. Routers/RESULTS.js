const { Router } = require("express");

const resultsController = require("../2. Controller/Results");

const resultsRouter = Router();

resultsRouter.get("/:id", resultsController.show);
resultsRouter.post("/", resultsController.create);
resultsRouter.get("/:id/average", resultsController.showAverage);
resultsRouter.get(
  "/:id/subject/:subjectId",
  resultsController.showAverageBySubject,
);

module.exports = resultsRouter;
