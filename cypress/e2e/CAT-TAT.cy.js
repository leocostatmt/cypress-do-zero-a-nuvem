describe('CEntral de Atendimento ao Cliente', () => {


  beforeEach('acessa a aplicação', () => {
    cy.visit('src/index.html')
  }
)


  it('verifica o titulo da aplicação' , () => {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })

  it('preenche os campos obrigatórios e envia o formulário', () => {
    cy.get('#firstName').type('João')
    cy.get('#lastName').type('Silva')
    cy.get('#email').type('joao.silva@example.com')
    cy.get('#open-text-area').type('Gostaria de mais informações sobre o serviço.')
    cy.get('button[type="submit"]').click()
  })

  it('exibe mensagem de erro ao enviar o formulário sem preencher os campos obrigatórios', () => {
    cy.get('button[type="submit"]').click()
    cy.get('.error').should('be.visible')
  })

})