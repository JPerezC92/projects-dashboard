import { RepositoryAlreadyExistsError } from "../../../domain/RepositoryAlreadyExistsError";
import { RepositoryWidget } from "../../../domain/RepositoryWidget";
import { RepositoryWidgetRepository } from "../../../domain/RepositoryWidgetRepository";
import { WidgetAddedEvent } from "../../../domain/WidgetAddedEvent";

export function useAddRepositoryWidget(repository: RepositoryWidgetRepository): {
	save(widget: RepositoryWidget): Promise<RepositoryAlreadyExistsError | void>;
} {
	async function save(widget: RepositoryWidget) {
		const widgetsRepository = await repository.search();
		if (
			widgetsRepository.some(
				(widgetRepository) => widgetRepository.repositoryUrl === widget.repositoryUrl
			)
		) {
			return new RepositoryAlreadyExistsError(widget.repositoryUrl);
		}

		await repository.save(widget);

		WidgetAddedEvent.trigger(widget);
	}

	return { save };
}
