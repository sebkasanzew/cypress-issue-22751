describe('empty spec', () => {
  it('passes', () => {
    cy.visit('/')

    cy.contains('Sign in with Keycloak').click()
    cy.origin('http://localhost:8080', () => {
      cy.get('#username').type('myuser')
      cy.get('#password').type('testuser')

      cy.get('#kc-login').click()
    })

    cy.contains('Request Cookies').click()

    cy.contains('next-auth.csrf-token')
    cy.contains('next-auth.callback-url')
    cy.contains('next-auth.session-token')

    cy.contains('all:').invoke('text').then((text) => {
      // turn "all: number" into "number"
      const length = text.split(': ')[1]
      return parseInt(length, 10)
    }).should('be.below', 600)
  })
})