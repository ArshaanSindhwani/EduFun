const { renderDOM } = require("../DOM test/helpers");
const jsdom = require("jsdom");
let dom;
let document;

describe("login", () => {
    beforeEach(async () => {
        dom = await renderDOM("./Script test/__test__/Login/login.html");
        document = await dom.window.document;
    });

    it("When an existing user inputs their details and presses submit, it redirects to homepage", async () => {
        const usernameInput

    })
})