
 Cypress.Commands.add('login', (email, senha) => { 
    cy.get('#email').type(email)
    cy.get('#password').type(senha)
    cy.get('button[type="submit"]').click()
 })

   Cypress.Commands.add('loginVisualStore', (usuario, senha) => {
    cy.get('#usuario').type(usuario)
    cy.get('#senha').type(senha)
    cy.get('button[type="submit"]').click()
 })

 Cypress.Commands.add('logout', () => {
    cy.get('button[class="m0l0iout_nochild" ] , [ id="e0_305i"]').click()
 })

 Cypress.Commands.add('limparCampos', () => {
    cy.get('button[type="button" ] , [id="btnLimpar"]').click()
 })

 Cypress.Commands.add('verificarMensagem', (mensagem) => {
    cy.get('#lblMensagem').should('be.visible').and('contain', mensagem)
 })

 Cypress.Commands.add('verificarUrl', (url) => {
    cy.url().should('include', url)
 })

 Cypress.Commands.add('verificarCampoVazio', (campo) => {
    cy.get(campo).should('have.value', '')
 })

 Cypress.Commands.add('verificarElementoVisivel', (seletor) => {
    cy.get(seletor).should('be.visible')
 })

// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })