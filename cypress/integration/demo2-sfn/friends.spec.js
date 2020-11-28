const username = 'robertopancake';
const alias = 'am';

context('Steam Friend Night Friends', () => {
    beforeEach(() => {
        cy.visit('https://sfn.now.sh')

        cy.get('.sfn-form')
            .find('input')
            .type(username) // this account actually exists
            .type('{enter}')

        cy.wait(2500)
    })

    it('retrieving friends list', () => {
        cy.location().should(location => {
            expect(location.pathname).to.eq('/friends')
        })

        cy.get('.friends-user')
            .find('.card')
            .contains(alias)

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
            .contains('bread')
    })

    it('friends list button active state', () => {
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