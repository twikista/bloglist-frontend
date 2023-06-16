describe('Blog app', function () {
  beforeEach(function () {
    /** reset database */
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    /**users objec*/
    const users = [
      { name: 'Rossi Miguel', username: 'mamakoko', password: '123456' },
      { name: 'Lucas santoro', username: 'luca', password: '123456' },
    ]

    /*
    create users
    */
    cy.request('POST', 'http://localhost:3003/api/users', users[0])
    cy.request('POST', 'http://localhost:3003/api/users', users[1])
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
      // cy.login({ username: 'mamakoko', password: '123456' })

      cy.contains('Rossi Miguel logged in')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('mamakoko')
      cy.get('#password').type('abcdef')
      cy.contains('login').click()

      cy.get('.error')
        .should('contain', 'wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'mamakoko', password: '123456' })
    })

    it('A blog can be created', function () {
      cy.contains('new blog').click()
      cy.get('#title').type('testing react apps')
      cy.get('#author').type('Brad Traversy')
      cy.get('#url').type('http://traversymedia.com')
      cy.get('#submit').click()

      cy.contains('testing react apps')
    })

    describe('and  blog exists', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'added from command line',
          author: 'Mike Shaw',
          url: 'http://peddler.com',
          likes: null,
        })
      })

      it('it can be liked', function () {
        cy.contains('view').click()
        cy.contains('likes').as('ele').contains('like').click()
        cy.get('@ele').should('contain', '1')
      })

      it('it can be deleted by its creator', function () {
        cy.contains('view').click()
        cy.contains('http://peddler.com')
          .parent()
          .as('parentEle')
          .contains('remove')
          .click()
        cy.get('@parentEle').should('not.contain', 'added from command line')
      })

      it('only its creator can see the remove button', function () {
        cy.contains('logout').click()
        cy.login({ username: 'luca', password: '123456' })
        cy.contains('view').click()
        cy.contains('likes').parent().as('parentEle')
        cy.get('@parentEle').should('not.contain', 'remove')
      })
    })

    describe('and several blogs exists', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'Software Testing',
          author: 'Mike Shaw',
          url: 'http://peddler.com',
          likes: 3,
        })
        cy.createBlog({
          title: 'End-to-End Testing',
          author: 'Luke Kegan',
          url: 'http://kegan.com',
          likes: 2,
        })
        cy.createBlog({
          title: 'JavaScript for Beginers',
          author: 'Class Central',
          url: 'http://classcentral.com',
          likes: 0,
        })
      })

      it('blogs are ordered by number of likes', function () {
        cy.contains('End-to-End').parent().contains('view').click()
        cy.contains('likes').contains('like').as('likeBtn').click()
        cy.wait(1000)
        cy.get('@likeBtn').click()

        cy.contains('Software Testing').parent().contains('view').click()
        cy.contains('JavaScript for Beginers').parent().contains('view').click()

        cy.get('.blogs>div').as('blogs')
        cy.get('@blogs').eq(0).should('contain', 'End-to-End Testing')
        cy.get('@blogs').eq(1).should('contain', 'Software Testing')
        cy.get('@blogs').eq(2).should('contain', 'JavaScript for Beginers')
      })
    })
  })
})
