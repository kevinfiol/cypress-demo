const fixture = require('../../fixtures/fireblog.json');

context('Fireblog Signin', () => {
    beforeEach(() => {
        indexedDB.deleteDatabase('firebaseLocalStorageDb');

        // get url from fixture
        cy.visit(fixture.baseUrl);

        cy.get('#app')
            .find('.clearfix .top-0.clearfix .right')
            .as('appNav')

        cy.get('@appNav')
            .find('button')
            .contains('Sign In')
            .click()

        cy.get('.z4.overflow-auto')
            .as('signinModal')
    })

    it('test user able to log in', () => {
        cy.get('@signinModal')
            .find('input[placeholder="username"]')
            .type('kevin')

        cy.get('@signinModal')
            .find('input[placeholder="password"]')
            .type('hunter2')

        cy.get('button')
            .contains('Submit')
            .click()
            .end()

        cy.get('@appNav')
            .should('contain', 'Sign Out')
    })

    it('test user wrong password', () => {
        cy.get('@signinModal')
            .find('input[placeholder="username"]')
            .type('kevin')

        cy.get('@signinModal')
            .find('input[placeholder="password"]')
            .type('wrong_password')

        cy.get('button')
            .contains('Submit')
            .click()
            .end()

        cy.get('p.p2.rounded.bg-darken')
            .should('contain', 'The password is invalid or the user does not have a password.')
    })

    it('test user does not exist', () => {
        cy.get('@signinModal')
            .find('input[placeholder="username"]')
            .type('doug')

        cy.get('@signinModal')
            .find('input[placeholder="password"]')
            .type('fakepw')

        cy.get('button')
            .contains('Submit')
            .click()
            .end()

        cy.get('p.p2.rounded.bg-darken')
            .should('contain', 'User does not exist.')
    })
})