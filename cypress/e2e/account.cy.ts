import * as path from 'path'
import * as testUser from '../fixtures/test-user.json'

describe('account', () => {
  const url = 'http://localhost:5173'
  const getUrl = (...paths: string[]) => new URL(path.join(...paths), url).href
  const loginUrl = new URL('api/login', 'https://good-food-back.fly.dev').href
  const credentials = {
    email: 'test@test.com',
    password: '1234azer',
  }

  it('should show a register form', () => {
    cy.clearCookies()
    cy.setCookie('user', JSON.stringify(testUser.data.user))
    cy.setCookie('token', JSON.stringify(testUser.data.token))

    cy.visit(getUrl('account'))

    cy.get('#personal-info').click()
    cy.get('input').should('have.length.at.least', 3)
    cy.contains('button', 'Modifier').should('be.visible')
  })

  it("should contains current user's basic infos", () => {
    cy.clearCookies()
    cy.request('POST', loginUrl, credentials).then((resp) => {
      cy.setCookie('user', JSON.stringify(resp.body.data.user))
      cy.setCookie('token', JSON.stringify(resp.body.data.token))
      cy.intercept('/user', { body: resp.body, statusCode: 200 }).as('getUser')
      cy.visit(getUrl('account'))
      // todo : debug / finish test, it usually shows a NetworkError when trying to reach the account page
      cy.get('#personal-info').click()
      cy.wait(500)
      cy.contains('input', resp.body.data.user.firstname).should('be.visible')
      cy.contains('input', resp.body.data.user.lastname).should('be.visible')
      cy.contains('input', resp.body.data.user.email).should('be.visible')
    })
  })

  it('should redirect to home with a toast if user is not authenticated', () => {
    // todo : write test
  })
})

export {}
