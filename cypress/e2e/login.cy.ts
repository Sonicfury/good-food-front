import * as path from 'path'
import * as testUser from '../fixtures/test-user.json'

describe('login', () => {
  const url = 'http://localhost:5173'
  const getUrl = (...paths: string[]) => new URL(path.join(...paths), url).href
  const credentials = {
    email: 'test@test.com',
    password: '1234azer',
  }

  it('should show a login form', () => {
    cy.visit(getUrl('login'))
    cy.get('input').should('have.length', 2)
    cy.contains('button', 'Valider').should('be.visible')
  })

  it('should show hints on missing credentials', () => {
    cy.visit(getUrl('login'))
    cy.contains('button', 'Valider').click()
    cy.contains('span', 'Email requis').should('be.visible')
    cy.contains('span', 'Mot de passe requis').should('be.visible')
  })

  it('should show a message on wrong credentials', () => {
    cy.visit(getUrl('login'))
    cy.intercept('/api/login').as('loginApi')
    // todo : stub response with 401
    cy.get('input[name="email"]').type(credentials.email)
    cy.get('input[name="password"]').type('coucou')
    cy.contains('button', 'Valider').click()
    cy.wait('@loginApi')
    cy.contains('span', 'Adresse email ou mot de passe incorrect')
  })

  it('should redirect to home if user is logged in', () => {
    localStorage.setItem('session', JSON.stringify(testUser))
    cy.visit(getUrl('login'))
    cy.url().should('eq', getUrl('/'))
  })

  it('should redirect to home if login is successful (true e2e)', () => {
    cy.visit(getUrl('login'))
    cy.intercept('/api/login').as('loginApi')
    cy.get('input[name="email"]').type(credentials.email)
    cy.get('input[name="password"]').type(credentials.password)
    cy.contains('button', 'Valider').click()
    cy.wait('@loginApi')
    cy.url().should('eq', getUrl('/'))
  })
})

export {}
