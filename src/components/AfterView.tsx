import React from 'react';
import { DecisionItem } from '../types';
import { SEED_STATS, SEED_ISSUES, SEED_AGENTS } from '../data/seed';

interface AfterViewProps {
  currentDecision: DecisionItem | null;
  currentIndex: number;
  totalDecisions: number;
  onApprove: () => void;
  onDecline: () => void;
  onReset: () => void;
}

export const AfterView: React.FC<AfterViewProps> = ({
  currentDecision,
  currentIndex,
  totalDecisions,
  onApprove,
  onDecline,
  onReset
}) => {
  const percentDone = Math.round((SEED_STATS.done / SEED_STATS.totalIssues) * 100);

  return (
    <div className="after-container">
      {/* Banner */}
      <div className="mode-banner">
        <div className="mode-banner-text">
          <span className="mode-tag after">New Operator Flow</span>
          <span>
            <strong>2-Second Clarity</strong> — Answers <em>"does anything need me right now?"</em> with ONE decision card at a time. Lower-priority ideas are pre-ranked by agents.
          </span>
        </div>
        <span style={{ fontSize: '11px', color: 'var(--zk-muted)', fontWeight: 600 }}>
          Shortcuts: [A/Enter] Approve · [D/Esc] Decline · [U] Undo
        </span>
      </div>

      {/* Factory Progress Strip */}
      <div className="factory-strip">
        <div className="factory-strip-left">
          <span className="status-dot green"></span>
          <span>
            <strong>{SEED_STATS.done} of {SEED_STATS.totalIssues} issues shipped</strong> ({percentDone}%)
          </span>
          <div className="factory-progress-bar-wrap" title={`${percentDone}% completed`}>
            <div
              className="factory-progress-bar-fill"
              style={{ width: `${percentDone}%` }}
            ></div>
          </div>
          <span style={{ fontSize: '12px', color: 'var(--zk-text2)' }}>
            · 5 agents active · Auto Merge active ({SEED_STATS.autoMerge})
          </span>
        </div>
        <div className="factory-strip-meta">
          Pipeline status: <strong>Nominal</strong> (0 blocking runs)
        </div>
      </div>

      {/* ONE Decision Card at a time OR Calm Empty State */}
      <div className="decision-card-container">
        {currentDecision ? (
          <div className={`decision-card severity-${currentDecision.severity}`}>
            {/* Top Meta */}
            <div className="decision-top-meta">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="agent-ask-badge">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  <span>{currentDecision.askingAgent} · {currentDecision.agentModel}</span>
                </span>
                <span className="chip chip-low">{currentDecision.category}</span>
              </div>

              <div className="queue-indicator">
                <span>Decision <strong>{currentIndex + 1} of {totalDecisions}</strong></span>
                <span style={{ color: 'var(--zk-accent)', fontWeight: 700 }}>(+45 pre-ranked by agents)</span>
              </div>
            </div>

            {/* Headline < 8 words */}
            <h2 className="decision-headline">{currentDecision.headline}</h2>

            {/* Consequence / Impact if ignored */}
            <div className={`decision-impact ${currentDecision.impactType === 'warn' ? 'warn' : ''}`}>
              <strong>Impact: </strong>{currentDecision.impact}
            </div>

            {/* Verification & Diff */}
            <div className="decision-diff-box">
              <span>{currentDecision.diff}</span>
              <span className={`chip ${currentDecision.ciStatus === 'PASS' ? 'chip-done' : currentDecision.ciStatus === 'READY' ? 'chip-progress' : 'chip-high'}`}>
                CI: {currentDecision.ciStatus}
              </span>
            </div>

            {/* Actions */}
            <div className="decision-actions">
              <button
                className={`btn-primary-action ${currentDecision.severity === 'rollback' ? 'rollback' : ''}`}
                onClick={onApprove}
                title="Press 'Enter' or 'A' to approve"
              >
                <span>{currentDecision.primaryLabel}</span>
                <span className="kbd-key">↵ Enter</span>
              </button>

              <button
                className="btn-secondary-action"
                onClick={onDecline}
                title="Press 'Esc' or 'D' to decline"
              >
                <span>{currentDecision.secondaryLabel}</span>
                <span className="kbd-key" style={{ marginLeft: '6px' }}>Esc</span>
              </button>

              <div className="keyboard-hint">
                <span>10-second undo window on all actions</span>
              </div>
            </div>
          </div>
        ) : (
          /* Calm Empty State */
          <div className="calm-empty-state">
            <div className="calm-icon-circle">✓</div>
            <h2 className="calm-title">Nothing needs you.</h2>
            <p className="calm-desc">
              Your 5 agents are autonomously handling the factory. All decisions have been resolved or delegated. Next scheduled status checkpoint is in 4 hours.
            </p>
            <button className="btn-reset-demo" onClick={onReset}>
              ↺ Replay Decisions Demo
            </button>
          </div>
        )}
      </div>

      {/* Below the fold: Reference stat cards and tables (preserved for completeness) */}
      <div style={{ opacity: 0.95 }}>
        <div style={{ marginBottom: '14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h3 style={{ fontSize: '13px', fontWeight: 700, color: 'var(--zk-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Reference &amp; Background Telemetry (Below Fold)
          </h3>
          <span style={{ fontSize: '12px', color: 'var(--zk-muted)' }}>
            Accessible without obstructing immediate decisions
          </span>
        </div>

        <div className="stat-cards-grid">
          <div className="stat-card points-glow">
            <div className="stat-card-label">
              <span>Points</span>
              <span style={{ color: 'var(--zk-electric-blue)', fontWeight: 700 }}>Verified</span>
            </div>
            <div className="stat-card-value">
              {SEED_STATS.points.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-card-label">Created by me</div>
            <div className="stat-card-value">{SEED_STATS.createdByMe}</div>
          </div>

          <div className="stat-card">
            <div className="stat-card-label">Assigned to me</div>
            <div className="stat-card-value">{SEED_STATS.assignedToMe}</div>
          </div>

          <div className="stat-card">
            <div className="stat-card-label">Resolved</div>
            <div className="stat-card-value">{SEED_STATS.resolved}</div>
          </div>
        </div>

        {/* Issues Assigned to Me table */}
        <div className="section-card">
          <div className="section-header">
            <div className="section-title">
              <span>Issues assigned to me</span>
              <span className="section-badge">{SEED_ISSUES.length} items</span>
            </div>
          </div>

          <table className="zk-table">
            <thead>
              <tr>
                <th>Votes</th>
                <th>Issue</th>
                <th>Type</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Stage</th>
                <th>Reported</th>
              </tr>
            </thead>
            <tbody>
              {SEED_ISSUES.map((issue) => (
                <tr key={issue.id}>
                  <td>
                    <span style={{ fontWeight: 600, color: 'var(--zk-text2)' }}>
                      {issue.votes} votes
                    </span>
                  </td>
                  <td>
                    <span style={{ fontWeight: 600, color: 'var(--zk-text)' }}>
                      #{issue.id} {issue.title}
                    </span>
                  </td>
                  <td>
                    <span className="chip chip-low">{issue.type}</span>
                  </td>
                  <td>
                    <span className={`chip ${
                      issue.priority === 'High' ? 'chip-high' :
                      issue.priority === 'Medium' ? 'chip-medium' : 'chip-low'
                    }`}>
                      {issue.priority}
                    </span>
                  </td>
                  <td>
                    <span className={`chip ${
                      issue.status === 'Done' ? 'chip-done' :
                      issue.status === 'In Progress' ? 'chip-progress' : 'chip-low'
                    }`}>
                      {issue.status}
                    </span>
                  </td>
                  <td>{issue.stage}</td>
                  <td>{issue.reported}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Agents Table */}
        <div className="section-card">
          <div className="section-header">
            <div className="section-title">
              <span>Agents Status</span>
              <span className="section-badge">{SEED_AGENTS.length} registered</span>
            </div>
          </div>

          <table className="zk-table">
            <thead>
              <tr>
                <th>Agent</th>
                <th>Status</th>
                <th>Current Activity</th>
                <th>Last Seen</th>
              </tr>
            </thead>
            <tbody>
              {SEED_AGENTS.map((agent) => (
                <tr key={agent.name}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600 }}>
                      <span className={`status-dot ${agent.status === 'Idle' ? 'green' : 'gray'}`}></span>
                      <span>{agent.name}</span>
                    </div>
                  </td>
                  <td>
                    <span className={`chip ${agent.status === 'Idle' ? 'chip-idle' : 'chip-offline'}`}>
                      {agent.status}
                    </span>
                  </td>
                  <td style={{ color: 'var(--zk-text2)' }}>{agent.currentActivity}</td>
                  <td style={{ color: 'var(--zk-muted)' }}>{agent.lastSeen}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
