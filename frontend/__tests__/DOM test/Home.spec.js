const { renderDOM } = require('./helpers');

let dom;
let document;

describe('Home.html', () => {
        
    beforeEach(async () => {
        dom = await renderDOM('./Home/Home.html');
        document = await dom.window.document;
  })

    it('has a button', () => {
        const btn = document.getElementById('logout-nav')
        expect(btn).toBeTruthy
        expect(btn.innerHTML).toBe("Logout")
  })

    it('has a form', () => {
        const form = document.querySelector('form')
        expect(form).toBeTruthy
    })

    it('has a navbar containing buttons', () => {
        const navBar = document.getElementById('navbar')
        expect(navBar).toBeTruthy
        const buttonUser = document.getElementById('user-nav')
        expect(buttonUser).toBeTruthy
        expect(buttonUser.innerHTML).toBe('User info / Profile')
        const buttonClasses = document.getElementById('classes-nav')
        expect(buttonClasses).toBeTruthy
        expect(buttonClasses.innerHTML).toBe('My Classes')
        const buttonScore = document.getElementById('scores-nav')
        expect(buttonScore).toBeTruthy
        expect(buttonScore.innerHTML).toBe('My Scores')
    })
})

