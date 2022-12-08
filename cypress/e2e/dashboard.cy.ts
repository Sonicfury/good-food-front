import * as path from 'path';

const url = 'http://localhost:5173'

describe('Dashboard', () => {
    it('should display a navbar with 3 elements', () => {
        cy.visit(new URL(path.join('app', 'dashboard'), url).href)

        cy.get('nav')
            .should('be.visible')
            .find('a')
            .should('have.length', 3)
    });

    it('should have the home button active', () => {
        cy.visit(new URL(path.join('app', 'dashboard'), url).href)
        cy.get('a[aria-current="page"]')
            .should('be.visible')
            .should('have.attr', 'href').and('include', '/app/dashboard')
    });
});

export {}