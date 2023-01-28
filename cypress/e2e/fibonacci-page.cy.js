import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";

describe("Корректная работа Фибоначчи", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/fibonacci");
  });

  it("Если в инпуте пусто, то кнопка добавления недоступна", function () {
    cy.get('[data-cy="content"]').within(() => {
      cy.get('[data-cy="input"]').should("have.value", "");
      cy.get('[data-cy="calculate"]').should("be.disabled");
      cy.get('[data-cy="input"]').type("4");
      cy.get('[data-cy="calculate"]').should("not.be.disabled");
      cy.get('[data-cy="input"]').clear();
      cy.get('[data-cy="calculate"]').should("be.disabled");
    });
  });

  it("Числа генерируются корректно", function () {
    
    cy.get('[data-cy="content"]').within(() => {
      cy.get('[data-cy="input"]').type("4");
      cy.get('[data-cy="calculate"]').click();
      cy.get('[data-cy="input"]').should("be.disabled");
    });

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('div[class*="circle_circle"]')
      .children()
      .should("have.length", "1")
      .should("have.text", "0");

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('div[class*="circle_circle"]')
      .children()
      .should("have.length", "2")
      .should("have.text", "01");

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('div[class*="circle_circle"]')
      .children()
      .should("have.length", "3")
      .should("have.text", "011");

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('div[class*="circle_circle"]')
      .children()
      .should("have.length", "4")
      .should("have.text", "0112");

    cy.get('[data-cy="content"]').within(() => {
      cy.get('[data-cy="input"]').should("have.value", "");
      cy.get('[data-cy="calculate"]').should("be.disabled");
    });
  });
});
