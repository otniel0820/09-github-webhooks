import { GitHubStartPayload } from "../../interfaces";

export class GitHubService {
  constructor() {}

  onStar(payload: GitHubStartPayload): string {
    const { starred_at, sender, repository, action } = payload;

    return `User ${sender.login} ${action} star on ${repository.full_name}`;
  }
}
