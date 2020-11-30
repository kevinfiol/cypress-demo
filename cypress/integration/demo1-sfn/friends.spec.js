const fixture = require('../../fixtures/sfn.json');
const username = 'robertopancake';
const alias = 'am';

context('Steam Friend Night Friends', () => {
    beforeEach(() => {
        // get url from fixture
        cy.visit(fixture.baseUrl);

        // alias requests that are made
        cy.intercept('https://sfn-server.herokuapp.com/user/getAllProfiles/**').as('getAllProfiles')

        cy.get('.sfn-form')
            .find('input')
            .type(username) // this account actually exists
            .type('{enter}')

        cy.wait('@getAllProfiles')
    })

    it('retrieving friends list', () => {
        cy.location().should(location => {
            expect(location.pathname).to.eq('/friends')
        })

        cy.get('.friends-user')
            .find('.card')
            .should('contain', alias)

        // make sure alert container doesn't exist
        cy.get('.alert-container')
            .should('not.exist')
    })

    it('friends list friends filter', () => {
        cy.get('.friends-staged')
            .find('input')
            .type('bread')

        cy.get('.friends-friends')
            .find('.card')
            .should('have.length', 1)
            .should('contain', 'bread')
    })

    it('friends list button active state', () => {
        cy.get('.friends-staged')
            .find('button')
            .should('be.disabled')

        cy.get('.friends-staged')
            .find('button')
            .should('be.disabled')

        cy.get('.friends-staged')
            .find('input')
            .type('bread')

        cy.get('.friends-friends')
            .find('.card[title="bread"]')
            .click()

        cy.get('.friends-staged')
            .find('button')
            .should('not.be.disabled')
    })
})