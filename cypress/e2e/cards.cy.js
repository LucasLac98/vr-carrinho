

describe('Navegacao', () => {
    it('Validar o carrinho de compra', () => {
        //Link que será iniciado o teste
        cy.visit("https://www.vr.com.br")

        //Função que abre na aba principal o link que iria abrir uma nova janela.
        cy.window().then((win) => {
            cy.stub(win, 'open')
              .callsFake((url, target) => {
                return win.open.wrappedMethod.call(win, url, '_self');
              })
              .as('open');
          });

        //Clicar no botão Compre online
        cy.get('#buttonCompreOnline').click();


        cy.wait(5000);

        //Clicar no botão de fechar 
        cy.get('.close-button').click();

        //Selecionar a opção de cartões
        cy.get('#btn-selecionar-modalidade-avulso').click();

        cy.wait(5000);       

        //Inserir o valor em quantidade de cartões
        cy.get('#produto-auto-quantidade').type('300');

        //Inserir o valor em reais
        cy.get('#produto-auto-valor').type('50000');

        //Clicar no botão de adicionar ao carrinho
        cy.get('#btn-adicionar-carrinho-auto').click();

        //Clicar no botão de verificação do carrinho
        cy.get('#btn-meu-carrinho').click();

        //Validação de qual cartão está no carrinho
        cy.get('.product-title__information').should('have.text', 'Auto');
        
        //Validação do valor total que está no carrinho
        cy.get('.information__total-value').should('have.text', 'R$\u00a0150.000,00')

    });
});