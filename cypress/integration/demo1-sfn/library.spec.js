const fixture = require('../../fixtures/sfn.json');
const username = 'robertopancake';
const alias = 'am';

context('Steam Friend Night Library', () => {
    beforeEach(() => {
        // get url from fixture
        cy.visit(fixture.baseUrl);

        // alias requests that are made
        cy.intercept('https://sfn-server.herokuapp.com/user/getAllProfiles/**').as('getAllProfiles')
        cy.intercept('https://sfn-server.herokuapp.com/user/getCommonApps').as('getCommonApps')

        cy.get('.sfn-form')
            .find('input')
            .type(username)
            .type('{enter}')

        cy.wait('@getAllProfiles')

        cy.get('.friends-friends')
            .find('.card')
            .contains('bread')
            .click()

        cy.get('.friends-staged')
            .find('button')
            .click() // click here to find games

        cy.wait('@getCommonApps')
    })

    it('check if it shows the right profiles', () => {
        cy.get('.library-profiles')
            .find('.card.selectable')
            .should('have.length', 2) // there should only be two users

        cy.get('.library-profiles')
            .find('.card.selectable')
            .contains('am')

        cy.get('.library-profiles')
            .find('.card.selectable')
            .contains('bread')
    })

    it('check if platform filter works', () => {
        cy.get('.library-controls')
            .find('input[name="enable platform filter?"]')
            .click()
        cy.get('.library-controls')
            .find('#linux')
            .click()

        cy.get('.library-games')
            .find('h2')
            .should('contain', '60 games')

        cy.get('.library-games')
            .find('.card.game-card')
            .each(el => cy.wrap(el).should('contain', 'linux'))
    })
})