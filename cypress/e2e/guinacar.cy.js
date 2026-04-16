

describe('Suíte de Testes E2E e API - E-commerce Automotive', () => {

  const apiBaseUrl = 'https://api.meuecommerce.com.br/v1';

  context('Testes de Back-End (API)', () => {
    it('Deve listar os produtos automotivos com sucesso (Status 200)', () => {
      // Usando cy.request para testar a API DIRETAMENTE, sem abrir o navegador
      cy.request({
        method: 'GET',
        url: `${apiBaseUrl}/produtos?categoria=pecas`,
      }).then((response) => {
        // Validações da API
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('itens');
        expect(response.body.itens.length).to.be.greaterThan(0);
      });
    });

    it('Deve criar um novo usuário via API', () => {
      cy.request({
        method: 'POST',
        url: `${apiBaseUrl}/usuarios`,
        body: {
          nome: "Novo Cliente",
          email: "cliente@email.com",
          senha: "SenhaSegura123"
        }
      }).then((response) => {
        expect(response.status).to.eq(201);
      });
    });
  });

  context('Testes de Front-End (Web Desktop)', () => {
    beforeEach(() => {
      // Define a resolução padrão para desktop antes de cada teste
      cy.viewport(1280, 720);
      
      // Intercepta a chamada de login para não depender do banco de dados real (Mock)
      cy.intercept('POST', '**/auth/login', {
        statusCode: 200,
        body: { token: 'token-fake-123' }
      }).as('loginRequest'); // Cria um alias para a requisição
    });

    it('Deve realizar login e adicionar um item ao carrinho', () => {
      // Navegação
      cy.visit('https://www.meuecommerce.com.br/login');

      // Interação (usando data-cy, a melhor prática de seletores no Cypress)
      cy.get('[data-cy="input-email"]').type('cliente@email.com');
      cy.get('[data-cy="input-senha"]').type('SenhaSegura123');
      cy.get('[data-cy="btn-entrar"]').click();

      // Aguarda a requisição de rede finalizar antes de prosseguir
      cy.wait('@loginRequest');

      // Asserção: Verifica se redirecionou para o painel
      cy.url().should('include', '/painel');

      // Busca um produto e clica
      cy.get('[data-cy="busca-produto"]').type('Óleo de motor{enter}');
      cy.contains('Adicionar ao Carrinho').click();

      // Validação de estado
      cy.get('.toast-sucesso')
        .should('be.visible')
        .and('contain.text', 'Produto adicionado com sucesso');
    });
  });

  context('Testes de Front-End (Mobile Web)', () => {
    beforeEach(() => {
      // Configura o Cypress para simular a tela de um iPhone
      cy.viewport('iphone-x');
    });

    it('Deve abrir o menu hambúrguer no layout mobile', () => {
      cy.visit('https://www.meuecommerce.com.br');

      // No mobile, os links do menu principal devem estar escondidos
      cy.get('[data-cy="menu-principal"]').should('not.be.visible');

      // Clica no ícone do menu hambúrguer
      cy.get('[data-cy="btn-menu-mobile"]').click();

      // Valida se o menu lateral abriu corretamente
      cy.get('[data-cy="menu-lateral"]')
        .should('be.visible')
        .and('have.class', 'menu-ativo');
        
      // Interage com o menu
      cy.contains('Minha Conta').click();
      cy.url().should('include', '/login');
    });
  });
});