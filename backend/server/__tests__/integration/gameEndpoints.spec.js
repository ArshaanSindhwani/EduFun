
const request = require("supertest");

jest.mock("../../1. Model/game", () => ({
  getAll: jest.fn(),
  getAllByChallengeId: jest.fn(),
}));

const Game = require("../../1. Model/game");
const app = require("../../app");

describe("Game API Endpoints", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("GET /", () => {
    it("returns the API welcome message", async () => {
      const response = await request(app).get("/");

      expect(response.statusCode).toBe(200);
      expect(response.body.message).toBe("welcome");
      expect(response.body.description).toBe("EduFun API");
    });
  });

  describe("GET /game", () => {
    it("returns an array of games", async () => {
      const games = [
        {
          id: 1,
          challenge_name: "WW2",
          subject_id: 1,
        },
      ];

      Game.getAll.mockResolvedValue(games);

      const response = await request(app).get("/game");

      expect(response.statusCode).toBe(200);
      expect(response.body.data).toEqual(games);
      expect(Game.getAll).toHaveBeenCalledTimes(1);
    });

    it("returns a server error when retrieving games fails", async () => {
      Game.getAll.mockRejectedValue(
        new Error("Unable to locate any games.")
      );

      const response = await request(app).get("/game");

      expect(response.statusCode).toBe(500);
      expect(response.body.error).toBe("Unable to locate any games.");
    });
  });

  describe("GET /game/:id", () => {
    it("returns questions and answers for a challenge", async () => {
      const questions = [
        {
          questions_text: "What is the capital of France?",
          image_url: null,
          question_number: 1,
          answers_id: 1,
          answer_text: "Paris",
          answer_option: 1,
          score_value: 10,
        },
      ];

      Game.getAllByChallengeId.mockResolvedValue(questions);

      const response = await request(app).get("/game/1");

      expect(response.statusCode).toBe(200);
      expect(response.body.data).toEqual(questions);
      expect(Game.getAllByChallengeId).toHaveBeenCalledWith(1);
    });

    it("returns 404 when the challenge cannot be found", async () => {
      Game.getAllByChallengeId.mockRejectedValue(
        new Error("Unable to locate the game.")
      );

      const response = await request(app).get("/game/999");

      expect(response.statusCode).toBe(404);
      expect(response.body.error).toBe("Unable to locate the game.");
    });
  });
});
