describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Rossi Miguel',
      username: 'mamakoko',
      password: '123456',
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('Login Form is shown by default', function () {
    cy.contains('Log in to application')
    cy.contains('login')
  })

  describe('Login', function () {
    it('suceeds with correct credentials', function () {
      cy.get('#username').type('mamakoko')
      cy.get('#password').type('123456')
      cy.contains('login').click()

      cy.contains('Rossi Miguel logged in')
    })
  })
})
