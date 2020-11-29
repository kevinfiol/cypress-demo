const fixture = require('../../fixtures/sfn.json');

context('Steam Friend Night Frontpage', () => {
    beforeEach(() => {
        // get url from fixture
        cy.visit(fixture.baseUrl);

        // alias requests that are made
        cy.intercept('https://sfn-server.herokuapp.com/user/getAllProfiles/**').as('getAllProfiles')
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
            .should('contain', 'getting profiles')

        cy.wait('@getAllProfiles').then(interception => {
            cy.get('.alert-container')
                .should('contain', 'error: could not retrieve profiles')
        }) // wait for response


    })

    it('enter key on user input', () => {
        cy.get('.sfn-form')
            .find('input')
            .type('yet_another_fake_user')
            .type('{enter}')

        cy.wait('@getAllProfiles').then(interception => {
            cy.get('.alert-container')
                .should('contain', 'error: could not retrieve profiles')
        }) // wait for response
    })
});