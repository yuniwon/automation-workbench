import type { DataIssue } from "../core/table/types";

interface IssuePanelProps {
  issues: DataIssue[];
  diagnostics: string[];
}

export function IssuePanel({ issues, diagnostics }: IssuePanelProps) {
  const visibleIssues = issues.slice(0, 16);
  const issueGroups = countByType(issues);

  return (
    <section className="panel issue-panel">
      <div className="panel-heading">
        <span>Issues</span>
        <strong>{issues.length}</strong>
      </div>
      {diagnostics.length > 0 && (
        <div className="diagnostics">
          {diagnostics.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      )}
      {issueGroups.length > 0 && (
        <div className="issue-groups" aria-label="Issue type summary">
          {issueGroups.map(([type, count]) => (
            <span key={type}>
              {type.replace(/_/g, " ")} {count}
            </span>
          ))}
        </div>
      )}
      <div className="issue-list">
        {visibleIssues.length === 0 ? (
          <p className="empty-state">감지된 문제가 없습니다.</p>
        ) : (
          visibleIssues.map((issue) => (
            <article className={`issue-item ${issue.severity}`} key={issue.id}>
              <span>{issue.severity}</span>
              <p>{issue.message}</p>
            </article>
          ))
        )}
      </div>
      {issues.length > visibleIssues.length && (
        <p className="issue-limit">상세 이슈 {visibleIssues.length}건만 먼저 표시합니다.</p>
      )}
    </section>
  );
}

function countByType(issues: DataIssue[]): Array<[string, number]> {
  const counts = new Map<string, number>();
  issues.forEach((issue) => {
    counts.set(issue.type, (counts.get(issue.type) ?? 0) + 1);
  });

  return Array.from(counts.entries()).sort((a, b) => b[1] - a[1]);
}
