context('Steam Friend Night Frontpage', () => {
    beforeEach(() => {
        cy.visit('https://sfn.now.sh')
    })

    it('check button is disabled when input is empty', () => {
        cy.get('.sfn-form')
            .find('input')
            .as('formInput')

        cy.get('.sfn-form')
            .find('button[type="submit"]')
            .as('submitBtn')
            .should('be.disabled')

        cy.get('@formInput')
            .type('username that does not exist')
        cy.get('@submitBtn')
            .should('not.be.disabled')
    })

    it('error for non-existent user', () => {
        cy.get('.sfn-form')
            .find('input')
            .type('another_user_that_doesnt_exist')

        cy.get('.sfn-form')
            .find('button')
            .click()

        cy.get('.alert-container')
            .contains('getting profiles')

        cy.wait(3000) // wait for response

        cy.get('.alert-container')
            .contains('error: could not retrieve profiles')
    })

    it('enter key on user input', () => {
        cy.get('.sfn-form')
            .find('input')
            .type('yet_another_fake_user')
            .type('{enter}')

        cy.wait(3000)
        cy.get('.alert-container')
            .contains('error: could not retrieve profiles')
    })
});