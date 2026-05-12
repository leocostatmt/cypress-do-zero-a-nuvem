
 Cypress.Commands.add('login', (email, senha) => { 
    cy.get('#email').type(email)
    cy.get('#password').type(senha)
    cy.get('button[type="submit"]').click()
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