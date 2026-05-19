const loginController = require("../../../2. Controller/Login");
const Login = require("../../../1. Model/login");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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

describe("Login controller", () => {
  beforeEach(() => jest.clearAllMocks());

  afterAll(() => jest.resetAllMocks());

  describe("show", () => {
    let testUser, mockReq;

    beforeEach(() => {
      testUser = {
        id: 1,
        name: "Test Student",
        username: "student1",
        form: "7A",
        password: "password123",
      };

      mockReq = { params: { name: "student1" } };
    });

    it("should return a user with a 200 status code", async () => {
      jest.spyOn(Login, "getOneByUsername").mockResolvedValue(testUser);

      await loginController.show(mockReq, mockRes);

      expect(Login.getOneByUsername).toHaveBeenCalledTimes(1);
      expect(Login.getOneByUsername).toHaveBeenCalledWith("student1");
      expect(mockStatus).toHaveBeenCalledWith(200);
      expect(mockSend).toHaveBeenCalledWith({ data: testUser });
    });

    it("should return an error if the user is not found", async () => {
      jest
        .spyOn(Login, "getOneByUsername")
        .mockRejectedValue(new Error("Unable to locate user."));

      await loginController.show(mockReq, mockRes);

      expect(Login.getOneByUsername).toHaveBeenCalledTimes(1);
      expect(mockStatus).toHaveBeenCalledWith(404);
      expect(mockSend).toHaveBeenCalledWith({
        error: "Unable to locate user.",
      });
    });
  });

  describe("create", () => {
    it("should return a new user with a 201 status code", async () => {
      const testUser = {
        name: "Test Student",
        username: "student1",
        form: "7A",
        password: "password123",
      };

      const mockReq = { body: testUser };

      jest.spyOn(Login, "create").mockResolvedValue(testUser);

      await loginController.create(mockReq, mockRes);

      expect(Login.create).toHaveBeenCalledTimes(1);
      expect(mockStatus).toHaveBeenCalledWith(201);
      expect(mockSend).toHaveBeenCalledWith({
        data: testUser,
      });
    });

    it("should return an error if creation fails", async () => {
      const testUser = {
        name: "Test Student",
        username: "student1",
        form: "7A",
        password: "password123",
      };

      const mockReq = { body: testUser };

      jest.spyOn(Login, "create").mockRejectedValue(new Error("oh no"));

      await loginController.create(mockReq, mockRes);

      expect(Login.create).toHaveBeenCalledTimes(1);
      expect(mockStatus).toHaveBeenCalledWith(400);
      expect(mockSend).toHaveBeenCalledWith({
        error: "oh no",
      });
    });
  });

  describe("login", () => {
    it("should login a user with a 200 status code", async () => {
      const mockReq = {
        body: {
          username: "student1",
          password: "password123",
        },
      };

      const testUser = {
        id: 1,
        name: "Test Student",
        username: "student1",
        form: "7A",
        password: "hashedPassword",
      };

      jest.spyOn(Login, "getOneByUsername").mockResolvedValue(testUser);

      jest.spyOn(bcrypt, "compare").mockResolvedValue(true);

      jest
        .spyOn(jwt, "sign")
        .mockImplementation((payload, secret, options, callback) => {
          callback(null, "fake-token");
        });

      await loginController.login(mockReq, mockRes);

      expect(Login.getOneByUsername).toHaveBeenCalledTimes(1);
      expect(Login.getOneByUsername).toHaveBeenCalledWith("student1");

      expect(bcrypt.compare).toHaveBeenCalledWith(
        "password123",
        "hashedPassword",
      );

      expect(jwt.sign).toHaveBeenCalledTimes(1);

      expect(mockStatus).toHaveBeenCalledWith(200);

      expect(mockJson).toHaveBeenCalledWith({
        success: true,
        token: "fake-token",
        user: {
          id: 1,
          name: "Test Student",
          username: "student1",
          form: "7A",
        },
      });
    });

    it("should return an error if login fails", async () => {
      const mockReq = {
        body: {
          username: "missinguser",
          password: "password123",
        },
      };

      jest
        .spyOn(Login, "getOneByUsername")
        .mockRejectedValue(new Error("Unable to locate user."));

      await loginController.login(mockReq, mockRes);

      expect(Login.getOneByUsername).toHaveBeenCalledTimes(1);
      expect(mockStatus).toHaveBeenCalledWith(401);

      expect(mockSend).toHaveBeenCalledWith({
        error: "Unable to locate user.",
      });
    });
  });
});
