import React from "react";

import { GitHubRepository, RepositoryId } from "../../domain/GitHubRepository";
import { GitHubRepositoryRepository } from "../../domain/GitHubRepositoryRepository";

export function useGitHubRepository(
	repository: GitHubRepositoryRepository,
	repositoryId: RepositoryId
): {
	repositoryData: GitHubRepository | undefined;
} {
	const [repositoryData, setRepositoryData] = React.useState<GitHubRepository>();

	React.useEffect(() => {
		repository
			.byId(repositoryId)
			.then((repositoryData: GitHubRepository) => {
				setRepositoryData(repositoryData);
			})
			.catch(console.error);
	}, [repository, repositoryId]);

	return { repositoryData };
}
