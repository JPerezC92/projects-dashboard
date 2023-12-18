import { RepositoryWidget } from "../domain/RepositoryWidget";
import { RepositoryWidgetRepository } from "../domain/RepositoryWidgetRepository";

export class LocalStorageRepositoryWidgetRepository implements RepositoryWidgetRepository {
	localStorageKey = "widgets";

	async save(widget: RepositoryWidget): Promise<void> {
		const widgetItem = await this.search();
		localStorage.setItem(this.localStorageKey, JSON.stringify([...widgetItem, widget]));
	}

	async search(): Promise<RepositoryWidget[]> {
		const currentRepositoryWidgetItem = window.localStorage.getItem(this.localStorageKey);

		if (currentRepositoryWidgetItem) {
			return JSON.parse(currentRepositoryWidgetItem) as RepositoryWidget[];
		}

		return await Promise.resolve([] as RepositoryWidget[]);
	}
}
