describe('E2E Test Visual Store Condor', () => {
    beforeEach(() => {
        cy.visit('http://10.1.1.11:8091/vm_visualstore_adm')
        cy.wait(2000)

    })

    it('verifica o titulo da aplicação', () => {
        cy.title().should('be.equal', 'Login do Sistema')
    })


    // --- Testes de Login

    it('exibe mensagem de erro ao realizar login com credenciais inválidas', () => {
        cy.get('#usuarios').type('usuario')
        cy.get('#senha').type('senha incorreta')
        cy.get('button[type="submit" ] , [id="btnEnviar"]').click()
        cy.get('#lblMensagem').should('be.visible')
    })

    it('exibe mensagem de erro ao realizar login com campos vazios', () => {
        cy.get('button[type="submit" ] , [id="btnEnviar"]').click()
        cy.get('Usuário Inválido').should('be.visible')
    })

    it('exibe mensagem de erro ao realizar login com senha vazia', () => {
        cy.get('#usuarios').type('Administrador')
        cy.get('button[type="submit" ] , [id="btnEnviar"]').click()
        cy.get('#lblMensagem').should('be.visible')
    })

    it('exibe mensagem de erro ao realizar login com usuário vazio', () => {
        cy.get('#senha').type('416649')
        cy.get('button[type="submit" ] , [id="btnEnviar"]').click()
        cy.get('#lblMensagem').should('be.visible')
    })

    it('realiza login com sucesso', () => {
        cy.get('#usuarios').type('Administrador')
        cy.get('#senha').type('416649')
        cy.get('button[type="submit" ] , [ id="btnEnviar"]').click()
        cy.url().should('include', 'http://10.1.1.11:8091/vm_visualstore_adm/sistema.jsp')
    })


    // --- Teste de limpar campos

    it('limpa os campos de login', () => {
        cy.get('#usuarios').type('Administrador')
        cy.get('#senha').type('416649')
        cy.get('button[type="button" ] , [id="btnLimpar"]').click()
        cy.get('#usuarios').should('have.value', '')
        cy.get('#senha').should('have.value', '')
    })


    // --- Teste de Logout

    it('realiza logout com sucesso', () => {
        cy.get('button[class="m0l0iout_nochild" ] , [ id="e0_305i"]').click()
        cy.url().should('include', 'http://10.1.1.11:8091/vm_visualstore_adm/br/com/visualmix/generico/acesso/jsplogin/Event.jsp')

})


    // --- Loga e verifica elementos da página principal

    it('verifica elementos da página principal após login', () => {
        // Realiza login primeiro
        cy.get('#usuarios').type('Administrador')
        cy.get('#senha').type('416649')
        cy.get('button[type="submit" ] , [ id="btnEnviar"]').click()
        cy.url().should('include', 'http://10.1.1.11:8091/vm_visualstore_adm/sistema.jsp')
})

})