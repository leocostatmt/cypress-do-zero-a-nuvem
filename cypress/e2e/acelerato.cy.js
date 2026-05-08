
describe ('Suíte de Testes E2E - Acelerato', () => {

  beforeEach('acessa a aplicação', () => {
    cy.visit('https://visualmix.acelerato.com/login/normal')
    cy.wait(5000)
  })   

    it('verifica o titulo da aplicação' , () => {
        cy.title().should('be.equal', 'Acelerato - Login')
        cy.wait(2000)
    })

    it('realiza login com sucesso', () => {
        cy.get('#email').type('suporte17@visualmix.com.br')
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