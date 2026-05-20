const Outcome = require("../1. Model/results");

async function show(req, res) {
  try {
    const studentId = req.params.id;
    const results = await Outcome.getAllByStudentId(studentId);
    res.status(200).send({ data: results });
  } catch (err) {
    res.status(404).send({ error: err.message });
  }
}

async function create(req, res) {
  try {
    const data = req.body;
    const result = await Outcome.create(data);

    res.status(201).send({
      data: result,
    });
  } catch (err) {
    res.status(400).send({
      error: err.message,
    });
  }
}

async function showAverage(req, res) {
  try {
    const studentId = req.params.id;
    const average = await Outcome.getAverageScoreByStudentId(studentId);
    res.status(200).send({ data: average });
  } catch (err) {
    res.status(404).send({ error: err.message });
  }
}

async function showAverageBySubject(req, res) {
  try {
    const studentId = req.params.id;
    const subjectId = req.params.subjectId;
    const average = await Outcome.getAverageScoreBySubjectIdByStudentId(
      studentId,
      subjectId,
    );
    res.status(200).send({ data: average });
  } catch (err) {
    res.status(404).send({ error: err.message });
  }
}

module.exports = {
  show,
  create,
  showAverage,
  showAverageBySubject,
};
