/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/unbound-method */
import { render, screen, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { mock } from "jest-mock-extended";

import { RepositoryWidget } from "../../../src/domain/RepositoryWidget";
import { WidgetAddedEvent } from "../../../src/domain/WidgetAddedEvent";
import { LocalStorageRepositoryWidgetRepository } from "../../../src/infrastructure/LocalStorageWidgetRepository";
import { AddRepositoryWidgetForm } from "../../../src/sections/dashboard/AddRepositoryWidgetForm";

const mockRepository = mock<LocalStorageRepositoryWidgetRepository>();

describe("AddRepositoryWidgetForm", () => {
	beforeEach(() => {
		mockRepository.save.mockReset();
		mockRepository.search.mockReset();
	});

	it("show widget form when add button is clicked", async () => {
		render(<AddRepositoryWidgetForm repository={mockRepository} />);

		const button = await screen.findByRole("button", { name: new RegExp("Añadir", "i") });

		userEvent.click(button);

		const url = await screen.findByLabelText(/Url del repositorio/i);

		expect(url).toBeInTheDocument();
	});

	it("save new widget when form is submitted", async () => {
		jest.spyOn(WidgetAddedEvent, "trigger");
		mockRepository.search.mockResolvedValueOnce([]);

		const newWidget: RepositoryWidget = {
			id: "newWidgetId",
			repositoryUrl: "https://github.com/CodelyTV/DevDash",
		};

		render(<AddRepositoryWidgetForm repository={mockRepository} />);

		const button = await screen.findByRole("button", {
			name: new RegExp("Añadir repositorio", "i"),
		});

		userEvent.click(button);

		const id = await screen.findByLabelText(/Id/i);
		const url = screen.getByLabelText(/Url del repositorio/i);
		const submitButton = await screen.findByRole("button", {
			name: /Añadir/i,
		});

		userEvent.type(id, newWidget.id);
		await waitFor(() => expect(id).toHaveValue(newWidget.id));

		userEvent.type(url, newWidget.repositoryUrl);
		await waitFor(() => expect(url).toHaveValue(newWidget.repositoryUrl));

		userEvent.click(submitButton);

		const addAnotherRepositoryFormButton = await screen.findByRole("button", {
			name: new RegExp("Añadir repositorio", "i"),
		});

		expect(addAnotherRepositoryFormButton).toBeInTheDocument();
		expect(mockRepository.save).toHaveBeenCalledWith(newWidget);
		expect(WidgetAddedEvent.trigger).toHaveBeenCalledWith(newWidget);
	});

	it("show error when repository already exists in Dashboard", async () => {
		const existingWidget: RepositoryWidget = {
			id: "existingWidgetId",
			repositoryUrl: "https://github.com/CodelyTV/DevDash",
		};

		mockRepository.search.mockResolvedValueOnce([existingWidget]);

		const newWidget: RepositoryWidget = {
			id: "newWidgetId",
			repositoryUrl: "https://github.com/CodelyTV/DevDash",
		};

		render(<AddRepositoryWidgetForm repository={mockRepository} />);

		const button = await screen.findByRole("button", {
			name: new RegExp("Añadir repositorio", "i"),
		});

		userEvent.click(button);

		const id = await screen.findByLabelText(/Id/i);
		const url = screen.getByLabelText(/Url del repositorio/i);
		const submitButton = await screen.findByRole("button", {
			name: /Añadir/i,
		});

		userEvent.type(id, newWidget.id);
		await waitFor(() => expect(id).toHaveValue(newWidget.id));

		userEvent.type(url, newWidget.repositoryUrl);
		await waitFor(() => expect(url).toHaveValue(newWidget.repositoryUrl));

		userEvent.click(submitButton);

		const errorMessage = await screen.findByRole("alert", {
			description: /Repositorio duplicado/i,
		});

		expect(errorMessage).toBeInTheDocument();
		expect(mockRepository.save).not.toHaveBeenCalled();
	});
});
