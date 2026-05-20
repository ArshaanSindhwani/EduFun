const gameController = require("../../../2. Controller/Game");
const Game = require("../../../1. Model/game");

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

describe("Game controller", () => {
  beforeEach(() => jest.clearAllMocks());

  afterAll(() => jest.resetAllMocks());

  describe("index", () => {
    it("should return games with a 200 status code", async () => {
      const testGames = [
        {
          challenge_id: 1,
          challenge_name: "WW2",
          subject_id: 1,
        },
        {
          challenge_id: 2,
          challenge_name: "Romans",
          subject_id: 1,
        },
      ];

      jest.spyOn(Game, "getAll").mockResolvedValue(testGames);

      await gameController.index(null, mockRes);

      expect(Game.getAll).toHaveBeenCalledTimes(1);
      expect(mockStatus).toHaveBeenCalledWith(200);
      expect(mockSend).toHaveBeenCalledWith({ data: testGames });
    });

    it("should return an error upon failure", async () => {
      jest
        .spyOn(Game, "getAll")
        .mockRejectedValue(new Error("Unable to locate any games."));

      await gameController.index(null, mockRes);

      expect(Game.getAll).toHaveBeenCalledTimes(1);
      expect(mockStatus).toHaveBeenCalledWith(500);
      expect(mockSend).toHaveBeenCalledWith({
        error: "Unable to locate any games.",
      });
    });
  });

  describe("show", () => {
    it("should return a game with questions and answers with a 200 status code", async () => {
      const testGame = [
        {
          questions_text: "Which department will you focus on",
          image_url: null,
          question_number: 1,
          answers_id: 1,
          answer_text: "RAF",
          answer_option: "A",
          score_value: 20,
        },
        {
          questions_text: "Which department will you focus on",
          image_url: null,
          question_number: 1,
          answers_id: 2,
          answer_text: "Navy",
          answer_option: "B",
          score_value: 0,
        },
      ];

      const mockReq = { params: { id: 1 } };

      jest.spyOn(Game, "getAllByChallengeId").mockResolvedValue(testGame);

      await gameController.show(mockReq, mockRes);

      expect(Game.getAllByChallengeId).toHaveBeenCalledTimes(1);
      expect(Game.getAllByChallengeId).toHaveBeenCalledWith(1);
      expect(mockStatus).toHaveBeenCalledWith(200);
      expect(mockSend).toHaveBeenCalledWith({ data: testGame });
    });

    it("should return an error if the game is not found", async () => {
      const mockReq = { params: { id: 999 } };

      jest
        .spyOn(Game, "getAllByChallengeId")
        .mockRejectedValue(new Error("Unable to locate the game."));

      await gameController.show(mockReq, mockRes);

      expect(Game.getAllByChallengeId).toHaveBeenCalledTimes(1);
      expect(Game.getAllByChallengeId).toHaveBeenCalledWith(999);
      expect(mockStatus).toHaveBeenCalledWith(404);
      expect(mockSend).toHaveBeenCalledWith({
        error: "Unable to locate the game.",
      });
    });
  });
});
