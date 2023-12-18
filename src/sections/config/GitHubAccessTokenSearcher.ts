import { GitHubAccessTokenRepository } from "../../domain/GitHubAccessTokenRepository";
import { config } from "../../projectsdash_config";

export class GitHubAccessTokenSearcher {
	constructor(private readonly repository: GitHubAccessTokenRepository) {}

	search(): string {
		const token = this.repository.search();

		return token || config.github_access_token;
	}
}
