import React from "react";

import { RepositoryWidget } from "../../../domain/RepositoryWidget";
import { RepositoryWidgetRepository } from "../../../domain/RepositoryWidgetRepository";
import { WidgetAddedEvent } from "../../../domain/WidgetAddedEvent";
import { config } from "../../../projectsdash_config";

const RepositoryWidgetContext = React.createContext<{
	repositoryWidgets: RepositoryWidget[];
}>({
	repositoryWidgets: [],
});

export function RepositoryWidgetContextProvider({
	children,
	repositoryWidgetRepository,
}: {
	children: React.ReactNode;
	repositoryWidgetRepository: RepositoryWidgetRepository;
}) {
	const [repositoryWidgets, setRepositoryWidgets] = React.useState<RepositoryWidget[]>([]);

	React.useEffect(() => {
		repositoryWidgetRepository.search().then((repositoryWidgets) => {
			if (repositoryWidgets.length === 0) {
				setRepositoryWidgets(
					config.widgets.map((widget) => ({ id: widget.id, repositoryUrl: widget.repository_url }))
				);

				return;
			}

			setRepositoryWidgets(repositoryWidgets);
		});
	}, [repositoryWidgetRepository]);

	React.useEffect(() => {
		const reloadRepositoryWidgets = (_: CustomEvent<RepositoryWidget>): void => {
			repositoryWidgetRepository.search().then((repositoryWidgets) => {
				setRepositoryWidgets(repositoryWidgets);
			});
		};
		const clean = WidgetAddedEvent.listener(reloadRepositoryWidgets);

		return () => clean();
	}, [repositoryWidgetRepository]);

	return (
		<RepositoryWidgetContext.Provider value={{ repositoryWidgets }}>
			{children}
		</RepositoryWidgetContext.Provider>
	);
}

export function useRepositoryWidgetContext() {
	return React.useContext(RepositoryWidgetContext);
}
