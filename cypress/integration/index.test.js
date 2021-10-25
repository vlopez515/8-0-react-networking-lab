describe("index", () => {
  beforeEach(() => {
    cy.intercept("*/employees", require("../fixtures/employees")).as(
      "employeesBody"
    );

    const pets = require("../fixtures/pets");
    cy.intercept("*/pets*", (req) => {
      const id = req.query.employeeId;
      if (id) {
        const employeePets = pets.filter(({ employeeId }) => employeeId === id);
        req.reply({ body: employeePets });
      } else {
        req.reply({ body: pets });
      }
    }).as("petsBody");

    const { PORT = 3000 } = process.env;
    cy.visit(`http://localhost:${PORT}`);
    cy.waitForReact();

    cy.wait("@employeesBody");
  });

  it("should show all of the staff names", () => {
    cy.get("main").should("contain.text", "Leah Ayers");
    cy.get("main").should("contain.text", "Jovanni Hernandez");
    cy.get("main").should("contain.text", "Susan Gallegos");
    cy.get("main").should("contain.text", "Harper Anderson");
    cy.get("main").should("contain.text", "Leandro Barada");
  });

  it("should include prefixes, if included", () => {
    cy.get("main").should("contain.text", "Dr. Leah Ayers");
    cy.get("main").should("contain.text", "Dr. Jovanni Hernandez");
    cy.get("main").should("not.contain.text", "Dr. Susan Gallegos");
    cy.get("main").should("not.contain.text", "Dr. Harper Anderson");
    cy.get("main").should("not.contain.text", "Dr. Leandro Barada");
  });

  it("should include postfixes, if included", () => {
    cy.get("main").should("not.contain.text", "Leah Ayers, CVPM");
    cy.get("main").should("not.contain.text", "Jovanni Hernandez, CVPM");
    cy.get("main").should("contain.text", "Susan Gallegos, CVPM");
    cy.get("main").should("not.contain.text", "Harper Anderson, CVPM");
    cy.get("main").should("not.contain.text", "Leandro Barada, CVPM");
  });

  it("should, on click, show pets associated with a particular employee", () => {
    // Dr. Leah Ayers
    cy.get("article button").eq(0).click();
    cy.wait("@petsBody");
    cy.get("article").eq(0).should("contain.text", "Lady");
    cy.get("article").eq(0).should("contain.text", "Buddy");
    cy.get("article").eq(0).should("contain.text", "Mattie");

    // Dr. Jovanni Hernandez
    cy.get("article button").eq(1).click();
    cy.wait("@petsBody");
    cy.get("article").eq(1).should("contain.text", "Alanis");
    cy.get("article").eq(1).should("contain.text", "Cindy");
    cy.get("article").eq(1).should("contain.text", "Kaiser");
  });

  it("should, on click, show no pets if no pets are associated with an employee", () => {
    // Susan Gallegos
    cy.get("article button").eq(2).click();
    cy.wait("@petsBody");
    cy.get("article").eq(2).should("contain.text", "No pets listed");

    // Harper Anderson
    cy.get("article button").eq(3).click();
    cy.wait("@petsBody");
    cy.get("article").eq(3).should("contain.text", "No pets listed");

    // Leandro Barada
    cy.get("article button").eq(4).click();
    cy.wait("@petsBody");
    cy.get("article").eq(4).should("contain.text", "No pets listed");
  });

  it("should make use of all components", () => {
    cy.get("article button").eq(0).click();
    cy.wait("@petsBody");

    cy.react("NavBar");
    cy.react("EmployeeList");
    cy.react("Employee");
    cy.react("PetList");
  });
});
