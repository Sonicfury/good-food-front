describe('Home test', () => {
    it('should contain an image', () => {
        cy.visit('http://localhost:5173/');
        cy.get('img').should('have.length', 1);
    });
});

export {}