describe("service is available", function () {
  it("Сайт должен быть доступен по адресу localhost:3000", function () {
    cy.visit("http://localhost:3000");
    cy.contains("МБОУ АЛГОСОШ");
  });
});
