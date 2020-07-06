describe('Blog ', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Testi Testinen',
      username: 'tester',
      password: 'testaa'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('login fails with wrong password', function() {
    cy.contains('login').click()
    cy.get('#username').type('tester')
    cy.get('#password').type('wrong')
    cy.get('#login-button').click()

    cy.get('.error').contains('wrong username or password')
    cy.get('html').should('not.contain', 'Matti Luukkainen logged in')
  })

  it('user can login', function () {
    cy.contains('login').click()
    cy.get('#username').type('tester')
    cy.get('#password').type('testaa')
    cy.get('#login-button').click()

    cy.contains('Testi Testinen logged in')
  })

  describe('when logged in', function () {
    beforeEach(function () {
      cy.contains('login').click()
      cy.get('#username').type('tester')
      cy.get('#password').type('testaa')
      cy.get('#login-button').click()
    })

    it('user can create a new blog', function () {
      cy.contains('new blog').click()
      cy.get('#title').type('A new blog by Cypress')
      cy.get('#author').type('Cypress')
      cy.get('#url').type('www.cypress.com')
      cy.contains('save').click()
      cy.contains('A new blog by Cypress')
    })

    describe('with blog created', function () {
      beforeEach(function () {
        cy.contains('new blog').click()
        cy.get('#title').type('A new blog by Cypress')
        cy.get('#author').type('Cypress')
        cy.get('#url').type('www.cypress.com')
        cy.contains('save').click()
      })

      it('the user can like the blog', function () {
        cy.contains('info').click()
        cy.get('.like').click()
        cy.contains('1 likes')
      })

      it('the user can delete the blog', function () {
        cy.contains('delete').click()
        cy.contains('info').should('not.exist')
      })

      it.only('creating another blog and liking it reorders the blogs', function () {
        // create new
        cy.contains('new blog').click()
        cy.get('#title').type('Another automatic blog')
        cy.get('#author').type('Cypress')
        cy.get('#url').type('www.cypress.com')
        cy.contains('save').click()
  
        // check that it is currently the last one
        cy.get('#1').contains('Another')

        // like the last one
        cy.get('#1 button').contains('info').click()
        cy.get('#1 button').contains('like').click()

        // wait a bit then check that it's now the first
        cy.wait(500)
        cy.get('#0').contains('Another')
      })
    })
  })
})

/*

5.22: blogilistan end to end -testit, step6
Tee testi, joka varmistaa, että blogit järjestetään likejen mukaiseen järjestykseen, eniten likejä saanut blogi ensin.

Tämä tehtävä saattaa olla hieman edeltäviä haastavampi. Eräs ratkaisutapa on etsiä kaikki blogit ja tarkastella tulosta then-komennon takaisinkutsufunktiossa.

*/