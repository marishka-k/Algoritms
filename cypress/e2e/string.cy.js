import { DELAY_IN_MS } from "../../src/constants/delays";

describe("Корректная работа строки", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/recursion");
  });

  it("Если в инпуте пусто, то кнопка добавления недоступна.", function () {
    cy.get('[data-cy="content"]').within(() => {
      cy.get('[data-cy="input"]').should("have.value", "");
      cy.get('[data-cy="unwrap"]').should("be.disabled");
      cy.get('[data-cy="input"]').type("check");
      cy.get('[data-cy="unwrap"]').should("not.be.disabled");
      cy.get('[data-cy="input"]').clear();
      cy.get('[data-cy="unwrap"]').should("be.disabled");
    });
  });

  it("Cтрока разворачивается корректно", function () {
    cy.get('[data-cy="content"]').within(() => {
      cy.get('[data-cy="input"]').type("check");
      cy.get('[data-cy="unwrap"]').click();
      cy.get('[data-cy="input"]').should("be.disabled");
    });

    cy.get('div[class*="circle_circle"]').then((elem) => {
      cy.get(elem[0])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains("circle_changing"));
      cy.get(elem[0]).children().should("have.text", "c");

      cy.get(elem[1])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains("circle_default"));
      cy.get(elem[1]).children().should("have.text", "h");

      cy.get(elem[2])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains("circle_default"));
      cy.get(elem[2]).children().should("have.text", "e");

      cy.get(elem[3])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains("circle_default"));
      cy.get(elem[3]).children().should("have.text", "c");

      cy.get(elem[4])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains("circle_changing"));
      cy.get(elem[4]).children().should("have.text", "k");
    });

    cy.wait(DELAY_IN_MS);

    cy.get('div[class*="circle_circle"]').then((elem) => {
      cy.get(elem[0])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains("circle_modified"));
      cy.get(elem[0]).children().should("have.text", "k");

      cy.get(elem[1])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains("circle_changing"));
      cy.get(elem[1]).children().should("have.text", "h");

      cy.get(elem[2])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains("circle_default"));
      cy.get(elem[2]).children().should("have.text", "e");

      cy.get(elem[3])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains("circle_changing"));
      cy.get(elem[3]).children().should("have.text", "c");

      cy.get(elem[4])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains("circle_modified"));
      cy.get(elem[4]).children().should("have.text", "c");
    });

    cy.wait(DELAY_IN_MS);

    cy.get('div[class*="circle_circle"]').then((elem) => {
      cy.get(elem[0])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains("circle_modified"));
      cy.get(elem[0]).children().should("have.text", "k");

      cy.get(elem[1])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains("circle_modified"));
      cy.get(elem[1]).children().should("have.text", "c");

      cy.get(elem[2])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains("circle_changing"));
      cy.get(elem[2]).children().should("have.text", "e");

      cy.get(elem[3])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains("circle_modified"));
      cy.get(elem[3]).children().should("have.text", "h");

      cy.get(elem[4])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains("circle_modified"));
      cy.get(elem[4]).children().should("have.text", "c");
    });

    cy.wait(DELAY_IN_MS);

    cy.get('div[class*="circle_circle"]').then((elem) => {
      cy.get(elem[0])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains("circle_modified"));
      cy.get(elem[0]).children().should("have.text", "k");

      cy.get(elem[1])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains("circle_modified"));
      cy.get(elem[1]).children().should("have.text", "c");

      cy.get(elem[2])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains("circle_modified"));
      cy.get(elem[2]).children().should("have.text", "e");

      cy.get(elem[3])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains("circle_modified"));
      cy.get(elem[3]).children().should("have.text", "h");

      cy.get(elem[4])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains("circle_modified"));
      cy.get(elem[4]).children().should("have.text", "c");
    });

    cy.get('div[class*="circle_circle"]')
      .invoke("attr", "class")
      .then((classList) => expect(classList).contains("circle_modified"));

    cy.get('[data-cy="content"]').within(() => {
      cy.get('[data-cy="input"]').should("have.value", "");
      cy.get('[data-cy="unwrap"]').should("be.disabled");
    });
  });
});
