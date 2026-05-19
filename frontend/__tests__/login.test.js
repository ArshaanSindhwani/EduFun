const { renderDOM } = require('./helpers');

let dom;
let document;

describe('login.html', () => {
        
    beforeEach(async () => {
        dom = await renderDOM('/login.html');
        document = await dom.window.document;
  })

    it('has a button', () => {
        const btn = document.querySelector('button')
        expect(btn).toBeTruthy
        expect(btn.innerHTML).toBe("Register Here")
  })

    it('has a form', () => {
        const form = document.querySelector('form')
        expect(form).toBeTruthy
    })

})
