import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";

describe("Корректная работа очереди", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/list");
  });

  it("Если в инпуте пусто, то кнопка добавления недоступна", function () {
    cy.get('[data-cy="content"]').within(() => {
      cy.get('[data-cy="inputName"]').should("have.value", "");
      cy.get('[data-cy="inputIndex"]').should("have.value", "");
      cy.get('[data-cy="addToTail"]').should("be.disabled");
      cy.get('[data-cy="addToHead"]').should("be.disabled");
      cy.get('[data-cy="removeFromTail"]').should("not.be.disabled");
      cy.get('[data-cy="removeFromHead"]').should("not.be.disabled");
      cy.get('[data-cy="addToIndex"]').should("be.disabled");
      cy.get('[data-cy="removeToIndex"]').should("be.disabled");

      cy.get('[data-cy="inputIndex"]').type("1");
      cy.get('[data-cy="addToTail"]').should("be.disabled");
      cy.get('[data-cy="addToHead"]').should("be.disabled");
      cy.get('[data-cy="removeFromTail"]').should("not.be.disabled");
      cy.get('[data-cy="removeFromHead"]').should("not.be.disabled");
      cy.get('[data-cy="addToIndex"]').should("be.disabled");
      cy.get('[data-cy="removeToIndex"]').should("not.be.disabled");

      cy.get('[data-cy="inputName"]').type("abc");
      cy.get('[data-cy="inputIndex"]').clear();
      cy.get('[data-cy="addToTail"]').should("not.be.disabled");
      cy.get('[data-cy="addToHead"]').should("not.be.disabled");
      cy.get('[data-cy="removeFromTail"]').should("not.be.disabled");
      cy.get('[data-cy="removeFromHead"]').should("not.be.disabled");
      cy.get('[data-cy="addToIndex"]').should("be.disabled");
      cy.get('[data-cy="removeToIndex"]').should("be.disabled");

      cy.get('[data-cy="inputIndex"]').type("1");
      cy.get('[data-cy="addToTail"]').should("not.be.disabled");
      cy.get('[data-cy="addToHead"]').should("not.be.disabled");
      cy.get('[data-cy="removeFromTail"]').should("not.be.disabled");
      cy.get('[data-cy="removeFromHead"]').should("not.be.disabled");
      cy.get('[data-cy="addToIndex"]').should("not.be.disabled");
      cy.get('[data-cy="removeToIndex"]').should("not.be.disabled");
    });
  });

  it("Корректная отрисовка по умолчанию", function () {
    cy.get('div[class*="circle_circle"]')
      .should("have.length", 6)
      .invoke("attr", "class")
      .then((classList) => expect(classList).contains("circle_default"));

    cy.get('div[class*="circle_circle"]').then((elem) => {
      cy.get(elem[0]).children().should("not.have.text", "");
      cy.get(elem[1]).children().should("not.have.text", "");
      cy.get(elem[2]).children().should("not.have.text", "");
      cy.get(elem[3]).children().should("not.have.text", "");
      cy.get(elem[4]).children().should("not.have.text", "");
      cy.get(elem[5]).children().should("not.have.text", "");
    });
  });

  it("Корректное добавление элемента в head.", function () {
    cy.get('[data-cy="content"]').within(() => {
      cy.get('[data-cy="inputName"]').type("hd");
      cy.get('[data-cy="addToTail"]').should("be.not.disabled");
      cy.get('[data-cy="addToHead"]').should("be.not.disabled");
      cy.get('[data-cy="removeFromTail"]').should("be.not.disabled");
      cy.get('[data-cy="removeFromHead"]').should("be.not.disabled");
      cy.get('[data-cy="inputIndex"]').should("be.not.disabled");
      cy.get('[data-cy="addToIndex"]').should("be.disabled");
      cy.get('[data-cy="removeToIndex"]').should("be.disabled");
    });

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('[data-cy="content"]').within(() => {
      cy.get('[data-cy="addToHead"]').click();
      cy.get('[data-cy="inputName"]').should("be.disabled");
      cy.get('[data-cy="addToTail"]').should("be.disabled");
      cy.get('[data-cy="removeFromTail"]').should("be.disabled");
      cy.get('[data-cy="removeFromHead"]').should("be.disabled");
      cy.get('[data-cy="inputIndex"]').should("be.disabled");
      cy.get('[data-cy="addToIndex"]').should("be.disabled");
      cy.get('[data-cy="removeToIndex"]').should("be.disabled");
    });

    cy.get('div[class*="circle_circle"]')
      .contains("hd")
      .parent()
      .invoke("attr", "class")
      .then((classList) => expect(classList).contains("circle_small"));
    cy.get('div[class*="circle_circle"]')
      .contains("hd")
      .parent()
      .invoke("attr", "class")
      .then((classList) => expect(classList).contains("circle_changing"));

    cy.get('div[class*="circle_circle"]').then((elem) => {
      cy.get(elem[0]).children().should("have.text", "hd");
      cy.get(elem[0])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains("circle_modified"));
    });

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('div[class*="circle_circle"]')
      .should("have.length", 7)
      .invoke("attr", "class")
      .then((classList) => expect(classList).contains("circle_default"));
  });

  it("Корректное добавление элемента в tail", function () {
    cy.get('[data-cy="content"]').within(() => {
      cy.get('[data-cy="inputName"]').type("tl");
      cy.get('[data-cy="addToTail"]').should("be.not.disabled");
      cy.get('[data-cy="addToHead"]').should("be.not.disabled");
      cy.get('[data-cy="removeFromTail"]').should("be.not.disabled");
      cy.get('[data-cy="removeFromHead"]').should("be.not.disabled");
      cy.get('[data-cy="inputIndex"]').should("be.not.disabled");
      cy.get('[data-cy="addToIndex"]').should("be.disabled");
      cy.get('[data-cy="removeToIndex"]').should("be.disabled");
    });

    cy.get('[data-cy="content"]').within(() => {
      cy.get('[data-cy="addToTail"]').click();
      cy.get('[data-cy="inputName"]').should("be.disabled");
      cy.get('[data-cy="addToHead"]').should("be.disabled");
      cy.get('[data-cy="removeFromTail"]').should("be.disabled");
      cy.get('[data-cy="removeFromHead"]').should("be.disabled");
      cy.get('[data-cy="inputIndex"]').should("be.disabled");
      cy.get('[data-cy="addToIndex"]').should("be.disabled");
      cy.get('[data-cy="removeToIndex"]').should("be.disabled");
    });

    cy.get('div[class*="circle_circle"]')
      .contains("tl")
      .parent()
      .invoke("attr", "class")
      .then((classList) => expect(classList).contains("circle_small"));
    cy.get('div[class*="circle_circle"]')
      .contains("tl")
      .parent()
      .invoke("attr", "class")
      .then((classList) => expect(classList).contains("circle_changing"));

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('div[class*="circle_circle"]').then((elem) => {
      cy.get(elem[6]).children().should("have.text", "tl");
      cy.get(elem[6])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains("circle_modified"));
    });

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('div[class*="circle_circle"]')
      .should("have.length", 7)
      .invoke("attr", "class")
      .then((classList) => expect(classList).contains("circle_default"));
  });

  it("Корректное добавления элемента по индексу", function () {
    cy.get('[data-cy="content"]').within(() => {
      cy.get('[data-cy="inputName"]').type("ind");
      cy.get('[data-cy="inputIndex"]').type("2");
    });

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('[data-cy="content"]').within(() => {
      cy.get('[data-cy="addToIndex"]').click();
      cy.get('[data-cy="inputIndex"]').should("be.disabled");
      cy.get('[data-cy="inputName"]').should("be.disabled");
      cy.get('[data-cy="removeToIndex"]').should("be.disabled");
      cy.get('[data-cy="addToTail"]').should("be.disabled");
      cy.get('[data-cy="addToHead"]').should("be.disabled");
      cy.get('[data-cy="removeFromTail"]').should("be.disabled");
      cy.get('[data-cy="removeFromHead"]').should("be.disabled");
    });

    cy.get('div[class*="circle_circle"]')
      .contains("ind")
      .parent()
      .invoke("attr", "class")
      .then((classList) => expect(classList).contains("circle_small"));
    cy.get('div[class*="circle_circle"]')
      .contains("ind")
      .parent()
      .invoke("attr", "class")
      .then((classList) => expect(classList).contains("circle_changing"));

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('div[class*="circle_circle"]').then((elem) => {
      cy.get(elem[0])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains("circle_changing"));

      cy.get(elem[1])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains("circle_default"));

      cy.get(elem[2])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains("circle_changing"));

      cy.get(elem[3])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains("circle_default"));

      cy.get(elem[4])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains("circle_default"));
    });

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('div[class*="circle_circle"]').then((elem) => {
      cy.get(elem[0])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains("circle_changing"));

      cy.get(elem[1])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains("circle_changing"));

      cy.get(elem[2]).children().should("have.text", "ind");
      cy.get(elem[2])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains("circle_modified"));

      cy.get(elem[3])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains("circle_changing"));

      cy.get(elem[4])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains("circle_default"));
    });

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('div[class*="circle_circle"]')
      .should("have.length", 7)
      .invoke("attr", "class")
      .then((classList) => expect(classList).contains("circle_default"));
  });

  it("Корректное удаление элемента из head.", function () {
    cy.get('[data-cy="content"]').within(() => {
      cy.get('[data-cy="inputName"]').should("be.not.disabled");
      cy.get('[data-cy="addToTail"]').should("be.disabled");
      cy.get('[data-cy="addToHead"]').should("be.disabled");
      cy.get('[data-cy="removeFromTail"]').should("be.not.disabled");
      cy.get('[data-cy="removeFromHead"]').should("be.not.disabled");
      cy.get('[data-cy="inputIndex"]').should("be.not.disabled");
      cy.get('[data-cy="addToIndex"]').should("be.disabled");
      cy.get('[data-cy="removeToIndex"]').should("be.disabled");
    });

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('[data-cy="content"]').within(() => {
      cy.get('[data-cy="removeFromHead"]').click();
      cy.get('[data-cy="addToHead"]').should("be.disabled");
      cy.get('[data-cy="inputName"]').should("be.disabled");
      cy.get('[data-cy="addToTail"]').should("be.disabled");
      cy.get('[data-cy="removeFromTail"]').should("be.disabled");
      cy.get('[data-cy="inputIndex"]').should("be.disabled");
      cy.get('[data-cy="addToIndex"]').should("be.disabled");
      cy.get('[data-cy="removeToIndex"]').should("be.disabled");
    });

    cy.get('div[class*="circle_circle"]').then((elem) => {
      cy.get(elem[0]).children().should("have.text", "");
    });

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('div[class*="circle_circle"]').then((elem) => {
      cy.get(elem[0]).children().should("not.have.text", "");
    });

    cy.get('div[class*="circle_circle"]')
      .should("have.length", 5)
      .invoke("attr", "class")
      .then((classList) => expect(classList).contains("circle_default"));

    cy.get('[data-cy="content"]').within(() => {
      cy.get('[data-cy="inputName"]').should("be.not.disabled");
      cy.get('[data-cy="inputIndex"]').should("be.not.disabled");
      cy.get('[data-cy="addToTail"]').should("be.disabled");
      cy.get('[data-cy="addToHead"]').should("be.disabled");
      cy.get('[data-cy="removeFromTail"]').should("be.not.disabled");
      cy.get('[data-cy="removeFromHead"]').should("be.not.disabled");
      cy.get('[data-cy="addToIndex"]').should("be.disabled");
      cy.get('[data-cy="removeToIndex"]').should("be.disabled");
    });
  });

  it("Корректное удаление элемента из tail.", function () {
    cy.get('[data-cy="content"]').within(() => {
      cy.get('[data-cy="inputName"]').should("be.not.disabled");
      cy.get('[data-cy="addToTail"]').should("be.disabled");
      cy.get('[data-cy="addToHead"]').should("be.disabled");
      cy.get('[data-cy="removeFromTail"]').should("be.not.disabled");
      cy.get('[data-cy="removeFromHead"]').should("be.not.disabled");
      cy.get('[data-cy="inputIndex"]').should("be.not.disabled");
      cy.get('[data-cy="addToIndex"]').should("be.disabled");
      cy.get('[data-cy="removeToIndex"]').should("be.disabled");
    });

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('[data-cy="content"]').within(() => {
      cy.get('[data-cy="removeFromTail"]').click();
      cy.get('[data-cy="removeFromHead"]').should("be.disabled");
      cy.get('[data-cy="addToHead"]').should("be.disabled");
      cy.get('[data-cy="inputName"]').should("be.disabled");
      cy.get('[data-cy="addToTail"]').should("be.disabled");
      cy.get('[data-cy="inputIndex"]').should("be.disabled");
      cy.get('[data-cy="addToIndex"]').should("be.disabled");
      cy.get('[data-cy="removeToIndex"]').should("be.disabled");
    });

    cy.get('div[class*="circle_circle"]').then((elem) => {
      cy.get(elem[5]).children().should("have.text", "");
    });

    cy.get('div[class*="circle_circle"]')
      .should("have.length", 5)
      .invoke("attr", "class")
      .then((classList) => expect(classList).contains("circle_default"));

    cy.get('[data-cy="content"]').within(() => {
      cy.get('[data-cy="inputName"]').should("be.not.disabled");
      cy.get('[data-cy="inputIndex"]').should("be.not.disabled");
      cy.get('[data-cy="addToTail"]').should("be.disabled");
      cy.get('[data-cy="addToHead"]').should("be.disabled");
      cy.get('[data-cy="removeFromTail"]').should("be.not.disabled");
      cy.get('[data-cy="removeFromHead"]').should("be.not.disabled");
      cy.get('[data-cy="addToIndex"]').should("be.disabled");
      cy.get('[data-cy="removeToIndex"]').should("be.disabled");
    });
  });

  it("Корректное удаление элемента по индексу..", function () {
    cy.get('[data-cy="content"]').within(() => {
      cy.get('[data-cy="inputName"]').should("be.not.disabled");
      cy.get('[data-cy="inputIndex"]').type("2");
      cy.get('[data-cy="addToTail"]').should("be.disabled");
      cy.get('[data-cy="addToHead"]').should("be.disabled");
      cy.get('[data-cy="removeFromTail"]').should("be.not.disabled");
      cy.get('[data-cy="removeFromHead"]').should("be.not.disabled");
      cy.get('[data-cy="addToIndex"]').should("be.disabled");
      cy.get('[data-cy="removeToIndex"]').should("be.not.disabled");
    });

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('[data-cy="content"]').within(() => {
      cy.get('[data-cy="removeToIndex"]').click();
      cy.get('[data-cy="inputIndex"]').should("be.disabled");
      cy.get('[data-cy="addToIndex"]').should("be.disabled");
      cy.get('[data-cy="removeFromTail"]').should("be.disabled");
      cy.get('[data-cy="removeFromHead"]').should("be.disabled");
      cy.get('[data-cy="addToHead"]').should("be.disabled");
      cy.get('[data-cy="inputName"]').should("be.disabled");
      cy.get('[data-cy="addToTail"]').should("be.disabled");
    });

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('div[class*="circle_circle"]').then((elem) => {
      cy.get(elem[0])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains("circle_changing"));
      cy.get(elem[1])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains("circle_changing"));
      cy.get(elem[2])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains("circle_default"));
      cy.get(elem[3])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains("circle_default"));
      cy.get(elem[4])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains("circle_default"));
      cy.get(elem[5])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains("circle_default"));
    });

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('div[class*="circle_circle"]').then((elem) => {
      cy.get(elem[0])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains("circle_changing"));
      cy.get(elem[1])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains("circle_changing"));
      cy.get(elem[2])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains("circle_changing"));
      cy.get(elem[3])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains("circle_default"));
      cy.get(elem[4])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains("circle_default"));
      cy.get(elem[5])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains("circle_default"));
    });

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('div[class*="circle_circle"]').then((elem) => {
      cy.get(elem[0])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains("circle_changing"));

      cy.get(elem[1])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains("circle_changing"));

      cy.get(elem[2]).children().should("have.text", "");
      cy.get(elem[2])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains("circle_changing"));

      cy.get(elem[3])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains("circle_changing"));

      cy.get(elem[4])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains("circle_default"));

      cy.get(elem[5])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains("circle_default"));
    });

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('div[class*="circle_circle"]')
      .should("have.length", 5)
      .invoke("attr", "class")
      .then((classList) => expect(classList).contains("circle_default"));

    cy.get('[data-cy="content"]').within(() => {
      cy.get('[data-cy="inputName"]').should("be.not.disabled");
      cy.get('[data-cy="addToTail"]').should("be.disabled");
      cy.get('[data-cy="addToHead"]').should("be.disabled");
      cy.get('[data-cy="removeFromTail"]').should("be.not.disabled");
      cy.get('[data-cy="removeFromHead"]').should("be.not.disabled");
      cy.get('[data-cy="inputIndex"]').should("be.not.disabled");
      cy.get('[data-cy="addToIndex"]').should("be.disabled");
      cy.get('[data-cy="removeToIndex"]').should("be.disabled");
    });
  });
});
