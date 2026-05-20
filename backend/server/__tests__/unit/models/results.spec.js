const Outcome = require("../../../1. Model/results")
const db = require("../../../DB/connect")

describe("Outcome", () => {
    beforeEach(() => jest.clearAllMocks())

    afterAll(() => jest.resetAllMocks())

    describe("getAllByStudentId", () => {
        it("should return an array of results when given a valid student id", async () => {
            const testResults = 
            { id: 1,
              student_id: 1,
              score: 75,
              challenge_id: 1
            }
            jest.spyOn(db, "query").mockResolvedValueOnce({ rows: [testResults] })

            const result = await Outcome.getAllByStudentId(1)
            
            expect(result).toBeInstanceOf(Array)
            expect(result[0]).toBeInstanceOf(Outcome)
            expect(result[0].id).toBe(testResults.id)
            expect(result[0].student_id).toBe(testResults.student_id)
            expect(result[0].score).toBe(testResults.score)
            expect(result[0].challenge_id).toBe(testResults.challenge_id)
            expect(db.query).toHaveBeenCalledWith("SELECT o.score, c.challenge_name, s.name FROM outcome as o JOIN student as s ON o.student_id = s.id JOIN challenge as c ON o.challenge_id = c.id WHERE s.id = $1;", [1])
        })

        it("should throw an error when given an invalid student id", async () => {
            jest.spyOn(db, "query").mockResolvedValueOnce({ rows: [] })

            await expect(Outcome.getAllByStudentId(999)).rejects.toThrow("Unable to locate results for this student.")
        })
    })

    describe("getAverageScoreByStudentId", () => {
        it("should return an average score for a given student id", async () => {
            const studentAverage = 
            { average_score: 80 }
            jest.spyOn(db, "query").mockResolvedValueOnce({ rows: [studentAverage] })

            const result = await Outcome.getAverageScoreByStudentId(1)

            expect(result).toEqual(studentAverage)
            expect(db.query).toHaveBeenCalledWith("SELECT AVG(o.score) as average_score FROM outcome as o JOIN student as s ON o.student_id = s.id WHERE s.id = $1;", [1])
        })

        it("should throw an error when given an invalid student id", async () => {
            jest.spyOn(db, "query").mockResolvedValueOnce({ rows: [] })

            await expect(Outcome.getAverageScoreByStudentId(999)).rejects.toThrow("Unable to locate results for this student.")
        })
    })

    describe("getAverageScoreBySubjectIdByStudentId", () => {
        it("should return an average score for a given student and subject", async () => {
            const testAverage = { subject_name: "History", average_score: 75 }
            jest.spyOn(db, "query").mockResolvedValueOnce({ rows: [testAverage] })

            const result = await Outcome.getAverageScoreBySubjectIdByStudentId(1, 1)

            expect(result).toEqual(testAverage)
            expect(db.query).toHaveBeenCalledWith(
                `SELECT sub.subject_name, AVG(o.score) AS average_score 
            FROM outcome AS o 
            JOIN student AS s 
            ON o.student_id = s.id 
            JOIN challenge AS c 
            ON o.challenge_id = c.id 
            JOIN subject AS sub 
            ON c.subject_id = sub.id 
            WHERE s.id = $1 AND sub.id = $2 
            GROUP BY s.name, sub.subject_name;`,
            [1, 1]
        )
        })

        it("should throw an error when given an invalid student or subject id", async () => {
            jest.spyOn(db, "query").mockResolvedValueOnce({ rows: [] })

             await expect(Outcome.getAverageScoreBySubjectIdByStudentId(999, 999)).rejects.toThrow("Unable to locate results for this student and subject.")
        })
    })

})