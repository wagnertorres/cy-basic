/// <reference types="Cypress" />

describe("Tickets", () => {

    beforeEach(() => cy.visit("https://ticket-box.s3.eu-central-1.amazonaws.com/index.html")); //https://bit.ly/3mn7Zct

    it("Preencher todos os campos de texto", () => {
        const nome = "Wagner";
        const sobreNome = "Torres";

        cy.get("#first-name").type(nome);
        cy.get("#last-name").type(sobreNome);
        cy.get("#email").type("teste@email.com");
        cy.get("#requests").type("Vegan");
        cy.get("#signature").type(`${nome} ${sobreNome}`);
    });

    it("Selecionar dois tickets", () => {
        cy.get("#ticket-quantity").select("2");
    });

    it("Selecionar a opção 'VIP'", () => {
        cy.get("#vip").check();
    });
    
    it("Marcar a opção 'Social Media'", () => {
        cy.get("#social-media").check();
    });

    it("Selecionar 'friend' e 'publication', depois, desmarcar 'friend'", () => {
        cy.get("#friend").check();
        cy.get("#publication").check();
        cy.get("#friend").uncheck();
    });

    it("Verificar se o título do site está correto", () => {
        cy.get("header h1").should("contain", "TICKETBOX")
    });

    it("Alertar quando o e-mail for inválido", () => {
        cy.get("#email")
        .as("email")
        .type("email-email.com");
        
        cy.get("#email.invalid")
        .should("exist")

        cy.get("@email")
        .clear()
        .type("email@email.com");

        cy.get("#email.invalid").should("not.exist");
    });

    it("Preencher o formulário e resetar tudo", () => {
        const nome = "Wagner";
        const sobreNome = "Torres";
        const nomeCompleto = `${nome} ${sobreNome}`;

        cy.get("#first-name").type(nome);
        cy.get("#last-name").type(sobreNome);
        cy.get("#email").type("teste@email.com");
        cy.get("#ticket-quantity").select("2");
        cy.get("#vip").check();
        cy.get("#friend").check();
        cy.get("#requests").type("IPA beer");

        cy.get(".agreement p")
        .should("contain", `I, ${nomeCompleto}, wish to buy 2 VIP tickets.`);

        cy.get("#agree").click();
        cy.get("#signature").type(`${nomeCompleto}`);

        cy.get("button[type='submit']")
        .as("submitButton")
        .should("not.be.disabled");
        cy.get("button[type='reset'").click();

        cy.get("@submitButton").should("be.disabled");
    })

    it("Preencher apenas os campos obrigatórios do formulário usando comandos customizados do Cypress", () => {
        const cliente = {
            nome: "Wagner",
            sobreNome: "Torres",
            email: "wt@email.com.br"
        };
        cy.preencherCamposObrigatorios(cliente);

        cy.get("button[type='submit']")
        .as("submitButton")
        .should("not.be.disabled");

        cy.get("#agree").uncheck();

        cy.get("@submitButton").should("be.disabled");
    });
});