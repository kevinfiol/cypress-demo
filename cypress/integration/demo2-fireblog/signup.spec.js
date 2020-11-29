const fixture = require('../../fixtures/fireblog.json');

context('Fireblog Signup', () => {
    beforeEach(() => {
        indexedDB.deleteDatabase('firebaseLocalStorageDb');

        // get url from fixture
        cy.visit(fixture.baseUrl);

        cy.get('#app')
            .find('.clearfix .top-0.clearfix .right')
            .as('appNav')

        cy.get('@appNav')
            .find('button')
            .contains('Sign Up')
            .click()

        cy.get('.z4.overflow-auto')
            .as('signupModal')
    })

    it('test username already exists', () => {
        cy.get('@signupModal')
            .find('input[placeholder="username"]')
            .type('kevin')

        cy.get('@signupModal')
            .find('input[placeholder="email"]')
            .type('me@kevinfiol.com')

        cy.get('@signupModal')
            .find('input[placeholder="password"]')
            .type('hunter2')

        cy.get('@signupModal')
            .find('input[placeholder="confirm password"]')
            .type('hunter2')

        cy.get('button')
            .contains('Submit')
            .click()

        cy.get('p.p2.rounded.bg-darken')
            .should('contain', 'Username taken.')
    })

    it('test email badly formatted already exists', () => {
        cy.get('@signupModal')
            .find('input[placeholder="username"]')
            .type('this_user_does_not_exist_yet')

        cy.get('@signupModal')
            .find('input[placeholder="email"]')
            .type('this_is_not_a_valid_email')

        cy.get('@signupModal')
            .find('input[placeholder="password"]')
            .type('hunter2')

        cy.get('@signupModal')
            .find('input[placeholder="confirm password"]')
            .type('hunter2')

        cy.get('button')
            .contains('Submit')
            .click()

        cy.get('p.p2.rounded.bg-darken')
            .should('contain', 'The email address is badly formatted.')
    })

    it('test password mismatch', () => {
        cy.get('@signupModal')
            .find('input[placeholder="username"]')
            .type('kevin')

        cy.get('@signupModal')
            .find('input[placeholder="email"]')
            .type('this_is_not_a_valid_email')

        cy.get('@signupModal')
            .find('input[placeholder="password"]')
            .type('hunter2')

        cy.get('@signupModal')
            .find('input[placeholder="confirm password"]')
            .type('this doesnt match')

        cy.get('button')
            .contains('Submit')
            .should('not.exist')

        cy.get('p.p2.rounded.bg-darken')
            .should('contain', 'Passwords must match.')
    })
})