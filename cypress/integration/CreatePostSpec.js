describe("Create Post Test", () => {
  it("Goes through categories and posts views to finally create post", () => {
    cy.visit("http://localhost:3001/categories");
    cy
      .get("tbody tr")
      .first()
      .click();
    cy.url().should("include", "/postsincategory");
    cy
      .get(".fab-button")
      .first()
      .click();
    cy.url().should("include", "/createpost");
    cy
      .contains("Not Selected")
      .first()
      .click();
    cy.contains("1").click();
    cy
      .contains("Not Selected")
      .last()
      .click();
    cy.contains("2").click();

    cy.contains("CREATE").click();
    cy.url().should("include", "/createpost");

    cy.get("input#title").type("New Title");
    cy.get("input#lead").type("New Lead");
    cy
      .get("textarea")
      .last()
      .type("New TextArea");
    cy.contains("CREATE").click();
    cy.url().should("include", "/posts/");
  });
});
