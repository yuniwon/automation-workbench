import type { DataIssue } from "../core/table/types";

interface IssuePanelProps {
  issues: DataIssue[];
  diagnostics: string[];
}

export function IssuePanel({ issues, diagnostics }: IssuePanelProps) {
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
      {issues.length === 0 ? (
        <p className="empty-state">감지된 문제가 없습니다.</p>
      ) : (
        <details className="issue-details" open={issues.length <= 16}>
          <summary>상세 이슈 {issues.length}건 보기</summary>
          <div className="issue-list">
            {issues.map((issue) => (
            <article className={`issue-item ${issue.severity}`} key={issue.id}>
              <span>{issue.severity}</span>
              <p>{issue.message}</p>
            </article>
            ))}
          </div>
        </details>
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
