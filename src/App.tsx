import { LocalStorageRepositoryWidgetRepository } from "./infrastructure/LocalStorageWidgetRepository";
import { Router } from "./Router";
import { RepositoryWidgetContextProvider } from "./sections/dashboard/repositoryWidget/RepositoryWidgetContextProvider";

const repositoryWidgetRepository = new LocalStorageRepositoryWidgetRepository();

export function App() {
	return (
		<RepositoryWidgetContextProvider repositoryWidgetRepository={repositoryWidgetRepository}>
			<Router />
		</RepositoryWidgetContextProvider>
	);
}
