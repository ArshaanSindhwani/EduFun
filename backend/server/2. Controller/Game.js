const Game = require("../1. Model/game");

async function index(req, res) {
  try {
    const games = await Game.getAll();
    res.status(200).send({ data: games });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

async function show(req, res) {
  try {
    const challenge_id = parseInt(req.params.id);
    const game = await Game.getAllByChallengeId(challenge_id);
    res.status(200).send({ data: game });
  } catch (err) {
    res.status(404).send({ error: err.message });
  }
}

module.exports = {
  index,
  show
};
