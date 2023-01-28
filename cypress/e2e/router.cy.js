describe("проверка корректной работы роутинга на главной странице", function () {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("Строка доступна по адресу localhost:3000/recursion", function () {
    cy.get('a[href*="/recursion"]').click();
    cy.contains("Строка");
  });

  it("Фибоначчи доступна по адресу localhost:3000/fibonacci", function () {
    cy.get('a[href*="/fibonacci"]').click();
    cy.contains("Последовательность Фибоначчи");
  });

  it("Сортировка массива доступна по адресу localhost:3000/sorting", function () {
    cy.get('a[href*="/sorting"]').click();
    cy.contains("Сортировка массива");
  });

  it("Стек доступен по адресу localhost:3000/stack", function () {
    cy.get('a[href*="/stack"]').click();
    cy.contains("Стек");
  });

  it("Очередь доступна по адресу localhost:3000/queue", function () {
    cy.get('a[href*="/queue"]').click();
    cy.contains("Очередь");
  });

  it("Связный список доступен по адресу localhost:3000/list", function () {
    cy.get('a[href*="/list"]').click();
    cy.contains("Связный список");
  });
});
