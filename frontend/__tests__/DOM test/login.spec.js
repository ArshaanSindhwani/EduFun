const { renderDOM } = require('./helpers');

let dom;
let document;

describe('login.html', () => {
        
    beforeEach(async () => {
        dom = await renderDOM('./Login/login.html');
        document = await dom.window.document;
  })

    it('has a button', () => {
        const btn = document.querySelector('button')
        expect(btn).toBeTruthy
        expect(btn.innerHTML).toBe("Submit")
  })

    it('has a form', () => {
        const form = document.querySelector('form')
        expect(form).toBeTruthy
    })

    it('has a button to navigate login', () => {
        const navButton = document.getElementById('register-nav')
        expect(navButton).toBeTruthy
        expect(navButton.innerHTML).toBe("Register Here")
    })
})
