import { GitHubApiGitHubRepositoryPullRequestRepository } from "../../infrastructure/GitHubApiGitHubRepositoryPullRequestRepository";
import { GitHubApiGitHubRepositoryRepository } from "../../infrastructure/GitHubApiGitHubRepositoryRepository";
import { config } from "../../projectsdash_config";
import { GitHubRepositoryDetail } from "./GitHubRepositoryDetail";

const repository = new GitHubApiGitHubRepositoryRepository(config.github_access_token);
const gitHubRepositoryPullRequestRepository = new GitHubApiGitHubRepositoryPullRequestRepository(
	config.github_access_token
);

export class GithubRepositoryDetailFactory {
	static create() {
		return (
			<GitHubRepositoryDetail
				repository={repository}
				gitHubRepositoryPullRequestRepository={gitHubRepositoryPullRequestRepository}
			/>
		);
	}
}
