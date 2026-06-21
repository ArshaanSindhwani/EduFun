const resultsController = require("../../../2. Controller/Results");
const Outcome = require("../../../1. Model/results");

// Mocking response methods
const mockSend = jest.fn();
const mockJson = jest.fn();
const mockEnd = jest.fn();

// we are mocking .send(), .json() and .end()
const mockStatus = jest.fn(() => ({
  send: mockSend,
  json: mockJson,
  end: mockEnd,
}));

const mockRes = { status: mockStatus };

describe("Results controller", () => {
  beforeEach(() => jest.clearAllMocks());

  afterAll(() => jest.resetAllMocks());

  describe("show", () => {
    it("should return results for a student with a 200 status code", async () => {
      const testResults = [
        {
          id: 1,
          student_id: 1,
          score: 8,
          challenge_id: 1,
        },
        {
          id: 2,
          student_id: 1,
          score: 6,
          challenge_id: 2,
        },
      ];

      const mockReq = { params: { id: 1 } };

      jest.spyOn(Outcome, "getAllByStudentId").mockResolvedValue(testResults);

      await resultsController.show(mockReq, mockRes);

      expect(Outcome.getAllByStudentId).toHaveBeenCalledTimes(1);
      expect(Outcome.getAllByStudentId).toHaveBeenCalledWith(1);
      expect(mockStatus).toHaveBeenCalledWith(200);
      expect(mockSend).toHaveBeenCalledWith({ data: testResults });
    });

    it("should return an error if results are not found", async () => {
      const mockReq = { params: { id: 999 } };

      jest
        .spyOn(Outcome, "getAllByStudentId")
        .mockRejectedValue(
          new Error("Unable to locate results for this student."),
        );

      await resultsController.show(mockReq, mockRes);

      expect(Outcome.getAllByStudentId).toHaveBeenCalledTimes(1);
      expect(mockStatus).toHaveBeenCalledWith(404);
      expect(mockSend).toHaveBeenCalledWith({
        error: "Unable to locate results for this student.",
      });
    });
  });

  describe("showAverage", () => {
    it("should return an average score for a student with a 200 status code", async () => {
      const testAverage = {
        average_score: "7.00",
      };

      const mockReq = { params: { id: 1 } };

      jest
        .spyOn(Outcome, "getAverageScoreByStudentId")
        .mockResolvedValue(testAverage);

      await resultsController.showAverage(mockReq, mockRes);

      expect(Outcome.getAverageScoreByStudentId).toHaveBeenCalledTimes(1);
      expect(Outcome.getAverageScoreByStudentId).toHaveBeenCalledWith(1);
      expect(mockStatus).toHaveBeenCalledWith(200);
      expect(mockSend).toHaveBeenCalledWith({ data: testAverage });
    });

    it("should return an error if average score is not found", async () => {
      const mockReq = { params: { id: 999 } };

      jest
        .spyOn(Outcome, "getAverageScoreByStudentId")
        .mockRejectedValue(
          new Error("Unable to locate results for this student."),
        );

      await resultsController.showAverage(mockReq, mockRes);

      expect(Outcome.getAverageScoreByStudentId).toHaveBeenCalledTimes(1);
      expect(mockStatus).toHaveBeenCalledWith(404);
      expect(mockSend).toHaveBeenCalledWith({
        error: "Unable to locate results for this student.",
      });
    });
  });

  describe("showAverageBySubject", () => {
    it("should return an average score by subject for a student with a 200 status code", async () => {
      const testAverage = {
        subject_name: "History",
        average_score: "8.00",
      };

      const mockReq = {
        params: {
          id: 1,
          subjectId: 2,
        },
      };

      jest
        .spyOn(Outcome, "getAverageScoreBySubjectIdByStudentId")
        .mockResolvedValue(testAverage);

      await resultsController.showAverageBySubject(mockReq, mockRes);

      expect(
        Outcome.getAverageScoreBySubjectIdByStudentId,
      ).toHaveBeenCalledTimes(1);
      expect(
        Outcome.getAverageScoreBySubjectIdByStudentId,
      ).toHaveBeenCalledWith(1, 2);
      expect(mockStatus).toHaveBeenCalledWith(200);
      expect(mockSend).toHaveBeenCalledWith({ data: testAverage });
    });

    it("should return an error if average score by subject is not found", async () => {
      const mockReq = {
        params: {
          id: 999,
          subjectId: 2,
        },
      };

      jest
        .spyOn(Outcome, "getAverageScoreBySubjectIdByStudentId")
        .mockRejectedValue(
          new Error("Unable to locate results for this student and subject."),
        );

      await resultsController.showAverageBySubject(mockReq, mockRes);

      expect(
        Outcome.getAverageScoreBySubjectIdByStudentId,
      ).toHaveBeenCalledTimes(1);
      expect(mockStatus).toHaveBeenCalledWith(404);
      expect(mockSend).toHaveBeenCalledWith({
        error: "Unable to locate results for this student and subject.",
      });
    });
  });
});