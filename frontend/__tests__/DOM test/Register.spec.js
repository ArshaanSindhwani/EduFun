const { renderDOM } = require('./helpers');

let dom;
let document;

describe('Register.html', () => {
        
    beforeEach(async () => {
        dom = await renderDOM('./Register/Register.html');
        document = await dom.window.document;
  })

    it('has a form', () => {
        const form = document.querySelector('form')
        expect(form).toBeTruthy
    })

        it('has a button to navigate to Login', () => {
        const navButton = document.getElementById('login-nav')
        expect(navButton).toBeTruthy
        expect(navButton.innerHTML).toBe("Login Here")
    })
})

