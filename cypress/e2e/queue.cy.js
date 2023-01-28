import { DELAY_IN_MS } from "../../src/constants/delays";

describe("Корректная работа очереди", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/queue");
  });

  const addElement = (value) => {
    cy.get('[data-cy="content"]').within(() => {
      cy.get('[data-cy="input"]').type(value);
      cy.get('[data-cy="add"]').click();
      cy.get('[data-cy="del"]').should("be.disabled");
      cy.get('[data-cy="clear"]').should("be.disabled");
    });

    cy.wait(DELAY_IN_MS);

    cy.get('div[class*="circle_circle"]')
      .contains(value)
      .parent()
      .invoke("attr", "class")
      .then((classList) => expect(classList).contains("circle_default"));
  };

  it("Если в инпуте пусто, то кнопка добавления недоступна", function () {
    cy.get('[data-cy="content"]').within(() => {
      cy.get('[data-cy="input"]').should("have.value", "");
      cy.get('[data-cy="add"]').should("be.disabled");
      cy.get('[data-cy="del"]').should("be.disabled");
      cy.get('[data-cy="clear"]').should("be.disabled");
    });

    addElement(1);

    cy.get('[data-cy="content"]').within(() => {
      cy.get('[data-cy="input"]').should("have.value", "");
      cy.get('[data-cy="add"]').should("be.disabled");
      cy.get('[data-cy="del"]').should("not.be.disabled");
      cy.get('[data-cy="clear"]').should("not.be.disabled");
    });
  });

  it("Добавление элемента в очередь работает корректно", function () {
    cy.get('div[class*="circle_circle"]')
      .should("have.length", 7)
      .invoke("attr", "class")
      .then((classList) => expect(classList).contains("circle_default"));

    addElement("1");

    cy.get('div[class*="circle_circle"]').siblings("div").contains("head");
    cy.get('div[class*="circle_circle"]').siblings("div").contains("tail");
    cy.get('div[class*="circle_circle"]').siblings("p").contains("0");

    cy.wait(DELAY_IN_MS);

    cy.get('div[class*="circle_circle"]')
      .invoke("attr", "class")
      .then((classList) => expect(classList).contains("circle_default"));

    cy.wait(DELAY_IN_MS);

    addElement("2");

    cy.get('div[class*="circle_circle"]')
      .contains("2")
      .parent("div")
      .nextAll()
      .contains("tail");
    cy.get('div[class*="circle_circle"]').siblings("p").contains("1");
    cy.get('div[class*="circle_circle"]')
      .invoke("attr", "class")
      .then((classList) => expect(classList).contains("circle_default"));

    cy.wait(DELAY_IN_MS);

    addElement("3");

    cy.get('div[class*="circle_circle"]')
      .contains("3")
      .parent("div")
      .nextAll()
      .contains("tail");
    cy.get('div[class*="circle_circle"]').siblings("p").contains("2");
    cy.get('div[class*="circle_circle"]')
      .invoke("attr", "class")
      .then((classList) => expect(classList).contains("circle_default"));
  });

  it("Удаление элемента из очереди работает корректно", function () {
    addElement("1");
    cy.wait(DELAY_IN_MS);
    addElement("2");
    cy.wait(DELAY_IN_MS);
    addElement("3");
    cy.wait(DELAY_IN_MS);

    cy.get('[data-cy="content"]').within(() => {
      cy.get('[data-cy="input"]').should("have.value", "");
      cy.get('[data-cy="del"]').click();
    });

    cy.wait(DELAY_IN_MS);

    cy.get('div[class*="circle_circle"]')
      .first()
      .invoke("attr", "class")
      .then((classList) => expect(classList).contains("circle_default"));

    cy.get('div[class*="circle_circle"]').then((elem) => {
      cy.get(elem[0]).children().should("be.empty");
      cy.get(elem[0])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains("circle_default"));

      cy.get(elem[1])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains("circle_default"));
      cy.get(elem[1]).children().should("have.text", "2");

      cy.get(elem[2])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains("circle_default"));
      cy.get(elem[2]).children().should("have.text", "3");
    });

    cy.wait(DELAY_IN_MS);

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
    cy.wait(DELAY_IN_MS);

    cy.get('[data-cy="content"]').within(() => {
      cy.get('[data-cy="input"]').should("have.value", "");
      cy.get('[data-cy="clear"]').click();
    });

    cy.wait(DELAY_IN_MS);

    cy.get('div[class*="circle_circle"]').children().next().should("not.exist");

    cy.wait(DELAY_IN_MS);

    cy.get('[data-cy="content"]').within(() => {
      cy.get('[data-cy="input"]').should("have.value", "");
    });
  });
});
