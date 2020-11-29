const fixture = require('../../fixtures/fireblog.json');

context('Fireblog Routing', () => {
    beforeEach(() => {
        indexedDB.deleteDatabase('firebaseLocalStorageDb');

        // get url from fixture
        cy.visit(fixture.baseUrl);

        cy.get('#app')
            .find('.clearfix .top-0.clearfix .right')
            .as('appNav')
    })

    it('test route to userpage', () => {
        cy.visit(fixture.baseUrl + '/u/kevin')

        cy.location().should(location => {
            expect(location.pathname).to.eq('/u/kevin/1') // routing to a userpage should default to first page of blog
        })
    })

    it('test browser navigation buttons', () => {
        cy.visit(fixture.baseUrl + '/u/kevin')

        cy.location().should(location => {
            expect(location.pathname).to.eq('/u/kevin/1') // routing to a userpage should default to first page of blog
        })

        cy.get('a').contains('hello world').click()

        cy.location().should(location => {
            expect(location.pathname).to.eq('/p/kevin-uK4pgUXRoZp') // routing to a userpage should default to first page of blog
        })

        cy.get('@appNav').find('button').contains('Latest').click()

        cy.location().should(location => {
            expect(location.pathname).to.eq('/') // routing to a userpage should default to first page of blog
        })

        cy.go('back')

        cy.location().should(location => {
            expect(location.pathname).to.eq('/p/kevin-uK4pgUXRoZp') // routing to a userpage should default to first page of blog
        })

        cy.go('back')

        cy.location().should(location => {
            expect(location.pathname).to.eq('/u/kevin/1') // routing to a userpage should default to first page of blog
        })

        cy.go('forward')

        cy.location().should(location => {
            expect(location.pathname).to.eq('/p/kevin-uK4pgUXRoZp') // routing to a userpage should default to first page of blog
        })
    })

    it('test settings page only exists when logged in', () => {
        cy.visit(fixture.baseUrl + '/settings')

        cy.location().should(location => {
            expect(location.pathname).to.eq('/') // routing to settings while not logged in should boot back to index
        })

        // now login
        cy.get('@appNav')
            .find('button')
            .contains('Sign In')
            .click()

        cy.get('.z4.overflow-auto')
            .as('signinModal')

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

        // go to settings
        cy.wait(2000)
        cy.get('@appNav')
            .find('button')
            .contains('Settings')
            .click()

        cy.location().should(location => {
            expect(location.pathname).to.eq('/settings') // routing to settings while not logged in should boot back to index
        })
    })
})