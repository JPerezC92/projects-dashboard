import { RepositoryWidgetMother } from "../../RepositoryWidgetMother";

describe("Repository Widget Form", () => {
	it("Add new repository with id and url", () => {
		const newWidget = RepositoryWidgetMother.create({
			repositoryUrl: "https://github.com/CodelyTV/DevDash",
		});

		cy.visit("/");

		cy.findByRole("button", {
			name: new RegExp("Añadir", "i"),
		}).click();

		cy.findByLabelText(/Id/i).type(newWidget.id);
		cy.findByLabelText(/Url del repositorio/i).type(newWidget.repositoryUrl);

		cy.findByRole("button", {
			name: /Añadir/i,
		}).click();

		cy.findByText("CodelyTV/react-devdash").should("exist");
	});

	it("Show error when repository already exists in Dashboard", () => {
		const newWidget = RepositoryWidgetMother.create({
			repositoryUrl: "https://github.com/CodelyTV/DevDash",
		});

		cy.visit("/");

		cy.findByRole("button", {
			name: new RegExp("Añadir", "i"),
		}).click();

		cy.findByLabelText(/Id/i).type(newWidget.id);

		cy.findByLabelText(/Url del repositorio/i).type(newWidget.repositoryUrl);

		cy.findByRole("button", {
			name: /Añadir/i,
		}).click();

		cy.findByText("CodelyTV/react-devdash").should("exist");

		cy.findByRole("button", {
			name: new RegExp("Añadir", "i"),
		}).click();

		cy.findByLabelText(/Id/i).type(newWidget.id);

		cy.findByLabelText(/Url del repositorio/i).type(newWidget.repositoryUrl);

		cy.findByRole("button", {
			name: /Añadir/i,
		}).click();

		cy.findByText(/Repositorio duplicado/i).should("exist");
	});
});
