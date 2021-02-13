import { openUrlMenuItem } from "electron-util";

class GitHubRepo {
	owner     = '';
	repo_name = '';
	url?      = '';
	constructor(metadata: GitHubRepo) {
		const {
			owner,
			repo_name,
			url,
		} = metadata;
		this.owner = owner;
		this.repo_name = repo_name;
		if(url) {
			this.url = url;
		} else {
			this.url = `https://github.com/${owner}/${repo_name}`;
		}
	};
}

const GitHubRepo_MenuBar_Item = (
		metadata: {
			label: string;
			repo:  GitHubRepo;
		}
	) => {
		const {
			label,
			repo
		} = metadata
		const {
			owner,
			repo_name,
			url
		} = repo;
		var result;
		if(url) {
			result = openUrlMenuItem({
				label: label,
				url: url
			})
		} else {
			result = openUrlMenuItem({
				label: label,
				url: `https://github.com/${owner}/${repo_name}`,
			})
		};

		return result;
}
class GitHubIssue {
	assignees?: string = '';
	labels?:    string = '';
	template?:  string = '';
	title?:     string = '';

	constructor(metadata: GitHubIssue) {
		const {
			assignees,
			labels,
			template,
			title,
		} = metadata
		this.assignees = assignees
		this.labels = labels
		this.template = template
		this.title = title
	};
}

const get_issue_url = (repo: GitHubRepo, issue: GitHubIssue) => {
	const { owner, repo_name } = repo
	const { assignees, labels, template, title } = issue
	const metadata_labels = [
		`assignees=${assignees}`,
		`labels=${labels}`,
		`template=${template}`,
		`title=${title}`,
	];
	const [
		assignees_input,
		labels_input,
		template_input,
		title_input,
	] = metadata_labels
	const metadata = `${assignees_input}&${labels_input}&${template_input}&${title_input}`

	const issue_url = `https://github.com/${owner}/${repo_name}/issues/new?${metadata}`
	return issue_url
}

interface IssueTemplate_MenuBar {
	label: string,

	repo:  GitHubRepo,
	issue: GitHubIssue,
}

class GitHubIssueFromTemplate {
	constructor(template: IssueTemplate_MenuBar) {
		const {
			label,
			repo,
			issue,
		} = template
		return openUrlMenuItem({
			label: label,
			url: get_issue_url(repo, issue)
		})
	}
}

export {
	GitHubRepo_MenuBar_Item,
	get_issue_url,
	GitHubRepo,
	GitHubIssue,
	GitHubIssueFromTemplate,
};