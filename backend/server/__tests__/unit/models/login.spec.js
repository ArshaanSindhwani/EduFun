const Login = require("../../../1. Model/login")
const db = require("../../../DB/connect")

describe("Login", () => {
    beforeEach(() => jest.clearAllMocks())

    afterAll(() => jest.resetAllMocks())

    describe("getOneById", () => {
        it("should return a user when given a valid id", async () => {
            // Arrange
            const testUser = 
            { id: 1,
              name: "user",
              username: "user1",
              form: "7a",
              password: "password123" }
            jest.spyOn(db, "query").mockResolvedValueOnce({ rows: [testUser] })
            
            // Act
            const result = await Login.getOneById(1)

            // Assert
            expect(result).toBeInstanceOf(Login)
            expect(result.id).toBe(testUser.id)
            expect(result.name).toBe(testUser.name)
            expect(result.username).toBe(testUser.username)
            expect(result.form).toBe(testUser.form)
            expect(result.password).toBe(testUser.password) 
            expect(db.query).toHaveBeenCalledWith("SELECT * FROM student WHERE id = $1", [1])
        })

        it("should throw an error when given an invalid id", async () => {
            // Arrange 
            jest.spyOn(db, "query").mockResolvedValueOnce({ rows: [] })

            await expect(Login.getOneById(999)).rejects.toThrow("Unable to locate user.")
        })    
    })

    describe("getOneByUsername", () => {
        it("should return a user when given a valid username", async () => {
            // Arrange
            const testUser = 
            { id: 1,
              name: "user",
              username: "user1",
              form: "7a",
              password: "password123" }
            jest.spyOn(db, "query").mockResolvedValueOnce({ rows: [testUser] })
            
            // Act
            const result = await Login.getOneById(1)

            // Assert
            expect(result).toBeInstanceOf(Login)
            expect(result.id).toBe(testUser.id)
            expect(result.name).toBe(testUser.name)
            expect(result.username).toBe(testUser.username)
            expect(result.form).toBe(testUser.form)
            expect(result.password).toBe(testUser.password) 
            expect(db.query).toHaveBeenCalledWith("SELECT * FROM student WHERE id = $1", [1])
        })

        it("should throw an error when given an invalid id", async () => {
            // Arrange 
            jest.spyOn(db, "query").mockResolvedValueOnce({ rows: [] })

            await expect(Login.getOneById(999)).rejects.toThrow("Unable to locate user.")
        })    
    })

    describe("create", () => {
        it("resolves with a new user on successful creation", async () => {
            const newUserData = { username: "newuser", password: "newpassword", name: "New User", form: "7b" }
            jest.spyOn(db, "query").mockResolvedValueOnce({ rows: [ { ...newUserData, id: 1 } ] })
            jest.spyOn(db, "query").mockResolvedValueOnce({ rows: [ { ...newUserData, id: 1 } ] })
            

            const result = await Login.create(newUserData)

            expect(result).toBeInstanceOf(Login)
            expect(result).toHaveProperty("id", 1)
            expect(result).toHaveProperty("username", "newuser")
            expect(result).toHaveProperty("password", "newpassword")
            expect(result).toHaveProperty("name", "New User")
            expect(result).toHaveProperty("form", "7b")
            expect(db.query).toHaveBeenCalledWith("INSERT INTO student (username, password, name, form) VALUES ($1, $2, $3, $4) RETURNING *", [newUserData.username, newUserData.password, newUserData.name, newUserData.form])
        })

        it("should throw an error when one of the values is missing", async () => {
            const incompleteUserData = { username: "incompleteuser", password: "password123", name: "Incomplete User" }

            await expect(Login.create(incompleteUserData)).rejects.toThrow("Missing required fields.")
        })
    })
})