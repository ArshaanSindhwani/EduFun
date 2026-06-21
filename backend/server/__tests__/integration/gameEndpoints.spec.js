const request = require("supertest")
const app = require("../../app")
const { resetTestDB } = require("./config")

describe("Game API Endpoints", () => {
    let game 

    beforeEach(async () => {
        await resetTestDB()
    })

    beforeAll(() => {
        game = app.listen(4000, () => {
            console.log("Test server listening on port 4000")
        })
    })

    afterAll((done) => {
        console.log("Closing test server")
        game.close(done)
    })

    describe("")
})