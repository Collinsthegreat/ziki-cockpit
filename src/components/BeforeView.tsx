import React, { useState } from 'react';
import { SEED_STATS, SEED_ISSUES, SEED_AGENTS } from '../data/seed';

export const BeforeView: React.FC = () => {
  const [subView, setSubView] = useState<'dashboard' | 'inbox'>('dashboard');
  const [activeInboxTab, setActiveInboxTab] = useState<'need_input' | 'design' | 'new_ideas' | 'drafts'>('need_input');

  return (
    <div className="before-container">
      {/* Banner clarifying the baseline */}
      <div className="mode-banner">
        <div className="mode-banner-text">
          <span className="mode-tag before">Baseline View</span>
          <span>
            <strong>Today's Ziki UI</strong> — 4 stat cards, 7-column issue list, idle agents buried below the fold, and decisions split across 4 Inbox tabs.
          </span>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => setSubView('dashboard')}
            className={`filter-chip-counter ${subView === 'dashboard' ? 'active' : ''}`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setSubView('inbox')}
            className={`filter-chip-counter ${subView === 'inbox' ? 'active' : ''}`}
          >
            Product &gt; Issues (Inbox)
          </button>
        </div>
      </div>

      {subView === 'dashboard' ? (
        <>
          {/* Stat Cards (Points card has active blue glow) */}
          <div className="stat-cards-grid">
            <div className="stat-card points-glow">
              <div className="stat-card-label">
                <span>Points</span>
                <span style={{ color: 'var(--zk-electric-blue)', fontWeight: 700 }}>Active</span>
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

          {/* Table: Issues Assigned to Me */}
          <div className="section-card">
            <div className="section-header">
              <div className="section-title">
                <span>Issues assigned to me</span>
                <span className="section-badge">{SEED_ISSUES.length} items</span>
              </div>
              <span style={{ fontSize: '12px', color: 'var(--zk-muted)' }}>
                Sorted by most recent activity
              </span>
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
                      <div>
                        <span style={{ fontWeight: 600, color: 'var(--zk-text)' }}>
                          #{issue.id} {issue.title}
                        </span>
                        <span style={{ marginLeft: '8px', fontSize: '11px', color: 'var(--zk-muted)' }}>
                          ({issue.comments} comments)
                        </span>
                      </div>
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
                    <td>
                      <span style={{ fontSize: '12px', color: 'var(--zk-text2)' }}>
                        {issue.stage}
                      </span>
                    </td>
                    <td>
                      <span style={{ fontSize: '12px', color: 'var(--zk-muted)' }}>
                        {issue.reported}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Table: Agents */}
          <div className="section-card">
            <div className="section-header">
              <div className="section-title">
                <span>Agents Status</span>
                <span className="section-badge">{SEED_AGENTS.length} registered</span>
              </div>
              <span style={{ fontSize: '12px', color: 'var(--zk-muted)' }}>
                Model: Gemini
              </span>
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
        </>
      ) : (
        /* Product > Issues (Inbox) View */
        <div className="section-card">
          {/* Top Filter Counters */}
          <div className="issues-subnav-strip">
            <div className="filter-chip-counter active">
              <span>Open</span>
              <span className="counter-num">{SEED_STATS.open}</span>
            </div>
            <div className="filter-chip-counter">
              <span>In progress</span>
              <span className="counter-num">{SEED_STATS.inProgress}</span>
            </div>
            <div className="filter-chip-counter">
              <span>Done</span>
              <span className="counter-num">{SEED_STATS.done}</span>
            </div>
            <div className="filter-chip-counter">
              <span>Ready to Merge</span>
              <span className="counter-num">{SEED_STATS.readyToMerge}</span>
            </div>
            <div className="filter-chip-counter">
              <span>Auto Merge</span>
              <span className="counter-num">{SEED_STATS.autoMerge}</span>
            </div>
            <div className="filter-chip-counter">
              <span>All</span>
              <span className="counter-num">{SEED_STATS.totalIssues}</span>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '20px', padding: '20px' }}>
            {/* Left: Inbox tabs */}
            <div>
              <div style={{ display: 'flex', gap: '10px', borderBottom: '1px solid var(--zk-border)', paddingBottom: '10px', marginBottom: '16px' }}>
                <button
                  onClick={() => setActiveInboxTab('need_input')}
                  className={`filter-chip-counter ${activeInboxTab === 'need_input' ? 'active' : ''}`}
                >
                  Need your input (0)
                </button>
                <button
                  onClick={() => setActiveInboxTab('design')}
                  className={`filter-chip-counter ${activeInboxTab === 'design' ? 'active' : ''}`}
                >
                  Design feedback needed (0)
                </button>
                <button
                  onClick={() => setActiveInboxTab('new_ideas')}
                  className={`filter-chip-counter ${activeInboxTab === 'new_ideas' ? 'active' : ''}`}
                >
                  New ideas ({SEED_STATS.newIdeas})
                </button>
                <button
                  onClick={() => setActiveInboxTab('drafts')}
                  className={`filter-chip-counter ${activeInboxTab === 'drafts' ? 'active' : ''}`}
                >
                  Drafted ideas ({SEED_STATS.draftedIdeas})
                </button>
              </div>

              {/* Explanatory paragraph (the read-a-paragraph problem) */}
              <div style={{ background: '#f8fafc', border: '1px solid var(--zk-border)', borderRadius: '8px', padding: '12px 14px', fontSize: '13px', color: 'var(--zk-text2)', marginBottom: '20px' }}>
                <strong>How the Inbox works:</strong> When agents are blocked or need human direction, issues appear here. The Inbox badge reads 0 when no blocking input is required, even though 48 new and drafted ideas wait in adjacent tabs.
              </div>

              {/* Empty state or list */}
              {activeInboxTab === 'need_input' && (
                <div style={{ textAlign: 'center', padding: '40px 20px', border: '1px dashed var(--zk-border)', borderRadius: '12px' }}>
                  <div style={{ fontSize: '24px', marginBottom: '8px' }}>📂</div>
                  <div style={{ fontWeight: 600, color: 'var(--zk-text)' }}>Nothing here right now</div>
                  <div style={{ fontSize: '12px', color: 'var(--zk-muted)', marginTop: '4px' }}>
                    No agents are currently blocked waiting on your input.
                  </div>
                </div>
              )}

              {activeInboxTab === 'new_ideas' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div style={{ padding: '12px', border: '1px solid var(--zk-border)', borderRadius: '8px' }}>
                    <div style={{ fontWeight: 600 }}>Draft #41: Distributed cache invalidation via Redis pub/sub</div>
                    <div style={{ fontSize: '12px', color: 'var(--zk-muted)' }}>Proposed by Quantum-Triager · 4h ago</div>
                  </div>
                  <div style={{ padding: '12px', border: '1px solid var(--zk-border)', borderRadius: '8px' }}>
                    <div style={{ fontWeight: 600 }}>Draft #42: Edge CDN cache headers for static product catalog</div>
                    <div style={{ fontSize: '12px', color: 'var(--zk-muted)' }}>Proposed by Quantum-Triager · 1d ago</div>
                  </div>
                </div>
              )}

              {activeInboxTab === 'drafts' && (
                <div style={{ padding: '14px', border: '1px solid var(--zk-border)', borderRadius: '8px', color: 'var(--zk-muted)', fontSize: '13px' }}>
                  46 drafted ideas pending manual operator triage and prioritization.
                </div>
              )}
            </div>

            {/* Right: "Your agents" carousel panel */}
            <div style={{ background: '#f8fafc', border: '1px solid var(--zk-border)', borderRadius: '12px', padding: '16px' }}>
              <div style={{ fontWeight: 700, fontSize: '13px', marginBottom: '12px' }}>Your agents</div>
              <div style={{ background: '#ffffff', border: '1px solid var(--zk-border)', borderRadius: '8px', padding: '12px', marginBottom: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600, fontSize: '13px' }}>
                  <span className="status-dot green"></span>
                  <span>Quantum-Reviewer</span>
                </div>
                <div style={{ fontSize: '11px', color: 'var(--zk-muted)', marginTop: '4px' }}>
                  Model: Gemini · Standing by for PR reviews
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '6px' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#1f5fd9' }}></span>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#cbd5e1' }}></span>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#cbd5e1' }}></span>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#cbd5e1' }}></span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
