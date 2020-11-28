context('Counter App Integration Tests', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8090');
    });

    it('Test increment and decrement', () => {
        // should start at 0
        cy.get('.counter-number')
            .should('have.text', '0')
            .should('contain', '0')
            .should('have.html', '0');

        cy.get('.increment-btn')
            .click()
            .click()
            .click(); // click 3 times

        cy.get('.counter-number')
            .should('have.text', '3')
            .should('contain', '3')
            .should('have.html', '3');
    });
});