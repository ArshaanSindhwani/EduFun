const { renderDOM } = require('./helpers');

let dom;
let document;
let localStorage

describe('Game.html', () => {
        
    beforeEach(async () => {
        dom = await renderDOM('./Game/Game.html');
        document = await dom.window.document;
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

    it('has space for 5 questions', () => {
        const scenario1 = document.getElementById('scenario-1')
        expect(scenario1).toBeTruthy
        const scenario2 = document.getElementById('scenario-2')
        expect(scenario2).toBeTruthy
        const scenario3 = document.getElementById('secnario-3')
        expect(scenario3).toBeTruthy
        const scenario4 = document.getElementById('scenario-4')
        expect(scenario4).toBeTruthy
        const scenario5 = document.getElementById('scenario-5')
        expect(scenario5).toBeTruthy

    })
})