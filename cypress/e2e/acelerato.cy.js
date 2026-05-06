
describe ('Suíte de Testes E2E - Acelerato', () => {

  beforeEach('acessa a aplicação', () => {
    cy.visit('https://visualmix.acelerato.com/login/normal')
  })   

    it('verifica o titulo da aplicação' , () => {
        cy.title().should('be.equal', 'Acelerato - Login')
    })

    it('realiza login com sucesso', () => {
        cy.get('#email').type('suport17@visualmix.com.br')
        cy.get('#password').type('Rednose435$')
        cy.get('button[type="submit"]').click()
        cy.url().should('include', '/home')
    })

    it('exibe mensagem de erro ao realizar login com credenciais inválidas', () => {
        cy.get('#email').type('usuario@visualmix.com.br')
        cy.get('#password').type('senha incorreta')
        cy.get('button[type="submit"]').click()
        cy.get('.error-message').should('be.visible')
    })

})