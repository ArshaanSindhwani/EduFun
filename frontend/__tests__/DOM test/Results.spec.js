const { renderDOM } = require('./helpers');

let dom;
let document;

describe('Results.html', () => {
        
    beforeEach(async () => {
        dom = await renderDOM('./Results/Results.html');
        document = await dom.window.document;
  })

    it('has a button', () => {
        const btn = document.getElementById('back-nav')
        expect(btn).toBeTruthy
        expect(btn.innerHTML).toBe("Back")
  })

    it('has a navbar containing buttons', () => {
        const navBar = document.getElementById('navbar')
        expect(navBar).toBeTruthy
        const buttonUser = document.getElementById('user-nav')
        expect(buttonUser).toBeTruthy
        expect(buttonUser.innerHTML).toBe('Profile')
        const buttonClasses = document.getElementById('classes-nav')
        expect(buttonClasses).toBeTruthy
        expect(buttonClasses.innerHTML).toBe('My Classes')
        const buttonScore = document.getElementById('scores-nav')
        expect(buttonScore).toBeTruthy
        expect(buttonScore.innerHTML).toBe('My Scores')
    })

    it('has a progress bar for WW2', ()=> {
        const ww2Bar = document.getElementById('ww2-bar')
        expect(ww2Bar).toBeTruthy
        expect(ww2Bar.innerHTML).toBe('0%')
    })
})
