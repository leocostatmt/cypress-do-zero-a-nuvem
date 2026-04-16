describe('CEntral de Atendimento ao Cliente', () => {
  it.only('acessa a aplicação' , () => {
    cy.visit('src/index.html')
  })

  it('verifica o titulo da aplicação' , () => {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })


})