import * as path from 'path'
import * as testUser from '../fixtures/test-user.json'

describe('login', () => {
    const url = 'http://localhost:5173'
    const getUrl = (...paths: string[]) => new URL(path.join(...paths), url).href
    const credentials = {
        email: 'test@test.com',
        password: '1234Azer!@#$',
    }

    it('should show a register form', () => {
        cy.visit(getUrl('register'))
        cy.get('input').should('have.length', 4)
        cy.contains('button', 'Valider').should('be.visible')
    })

    it('should show hints on missing credentials', () => {
        cy.visit(getUrl('register'))
        cy.contains('button', 'Valider').click()
        cy.contains('span', 'Prénom requis').should('be.visible')
        cy.contains('span', 'Nom requis').should('be.visible')
        cy.contains('span', 'Email requis').should('be.visible')
        cy.contains(
            'span',
            'Doit contenir 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial'
        ).should('be.visible')
    })

    it('should redirect to home if user is logged in', () => {
        localStorage.setItem('session', JSON.stringify(testUser))
        cy.visit(getUrl('register'))
        cy.url().should('eq', getUrl('/'))
    })

    // todo : check register api
    // it('should redirect to home if login is successful (true e2e)', () => {
    //     cy.visit(getUrl('register'))
    //     cy.intercept('/api/register', {fixture: 'test-user.json', statusCode: 200}).as('registerApi')
    //     cy.get('input[name="firstName"]').type(testUser.data.user.firstname)
    //     cy.get('input[name="lastName"]').type(testUser.data.user.lastname)
    //     cy.get('input[name="email"]').type(testUser.data.user.email)
    //     cy.get('input[name="password"]').type(credentials.password)
    //     cy.contains('button', 'Valider').click()
    //     cy.wait('@registerApi')
    //     cy.url().should('eq', getUrl('/'))
    // })
})

export {}
