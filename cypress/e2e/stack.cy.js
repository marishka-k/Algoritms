import { DELAY_IN_MS } from "../../src/constants/delays";

describe("Корректная работа стэка", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/stack");
  });

  const addElement = (value) => {
    cy.get('[data-cy="content"]').within(() => {
      cy.get('[data-cy="input"]').type(value);
      cy.get('[data-cy="push"]').click();
      cy.get('[data-cy="pop"]').should("be.disabled");
      cy.get('[data-cy="clear"]').should("be.disabled");
    });

    cy.get('div[class*="circle_circle"]')
      .contains(value)
      .parent()
      .invoke("attr", "class")
      .then((classList) => expect(classList).contains("circle_changing"));

    cy.wait(DELAY_IN_MS);
  };

  it("Если в инпуте пусто, то кнопка добавления недоступна", function () {
    cy.get('[data-cy="content"]').within(() => {
      cy.get('[data-cy="input"]').should("have.value", "");
      cy.get('[data-cy="push"]').should("be.disabled");
      cy.get('[data-cy="pop"]').should("be.disabled");
      cy.get('[data-cy="clear"]').should("be.disabled");
    });

  addElement("1");

 	cy.get('[data-cy="content"]').within(() => {
		cy.get('[data-cy="input"]').should("have.value", "");
		cy.get('[data-cy="push"]').should("be.disabled");
		cy.get('[data-cy="pop"]').should("be.not.disabled");
		cy.get('[data-cy="clear"]').should("be.not.disabled");
	  });

  });

  it("Добавление элемента в стек работает корректно", function () {
    addElement("1");

    cy.get('div[class*="circle_circle"]')
      .invoke("attr", "class")
      .then((classList) => expect(classList).contains("circle_default"));

    addElement("2");

    cy.get('div[class*="circle_circle"]').then((elem) => {
      cy.get(elem[0])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains("circle_default"));
      cy.get(elem[0]).children().should("have.text", "1");

      cy.get(elem[1])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains("circle_default"));
      cy.get(elem[1]).children().should("have.text", "2");
    });

    addElement("3");

    cy.get('div[class*="circle_circle"]').then((elem) => {
      cy.get(elem[0])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains("circle_default"));
      cy.get(elem[0]).children().should("have.text", "1");

      cy.get(elem[1])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains("circle_default"));
      cy.get(elem[1]).children().should("have.text", "2");

      cy.get(elem[2])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains("circle_default"));
      cy.get(elem[2]).children().should("have.text", "3");
    });
  });

  it("Удаление элемента из стека работает корректно", function () {
    addElement("1");
    cy.wait(DELAY_IN_MS);
    addElement("2");

    cy.get('[data-cy="content"]').within(() => {
      cy.get('[data-cy="input"]').should("have.value", "");      
      cy.get('[data-cy="pop"]').click();
    });

    cy.wait(DELAY_IN_MS);

    cy.get('div[class*="circle_circle"]').then((elem) => {
      cy.get(elem[0])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains("circle_default"));
      cy.get(elem[0]).children().should("have.text", "1");
    });
    cy.get('[data-cy="content"]').within(() => {
      cy.get('[data-cy="input"]').should("have.value", "");    
    });
  });

  it("Кнопка «Очистить» работает корректно", function () {
    addElement("1");
    cy.wait(DELAY_IN_MS);
    addElement("2");
    cy.wait(DELAY_IN_MS);
    addElement("3");

    cy.get('[data-cy="content"]').within(() => {
      cy.get('[data-cy="input"]').should("have.value", "");
      cy.get('[data-cy="clear"]').click();
    });

    cy.wait(DELAY_IN_MS);

    cy.get('div[class*="circle_circle"]').should("not.exist");

    cy.get('[data-cy="content"]').within(() => {
      cy.get('[data-cy="input"]').should("have.value", "");     
    });
  });
});
