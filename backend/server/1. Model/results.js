const db = require("../DB/connect")

class Results {
    constructor({ id, student_id, teacher_id, outcome_id, subject_id }) {
        this.id = id
        this.student_id = student_id
        this.teacher_id = teacher_id
        this.outcome_id = outcome_id
        this.subject_id = subject_id
    }

    static async getAllByStudentId(studentId) {
        const response = await db.query("SELECT * FROM results WHERE student_id = $1", [studentId])
        if (response.rows.length < 1) {
            throw new Error("Unable to locate results for this student.")
        }
        return response.rows.map(result => new Results(result))
    }
}