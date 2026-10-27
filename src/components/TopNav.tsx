import React from 'react';
import { ViewMode } from '../types';

interface TopNavProps {
  viewMode: ViewMode;
  onSelectViewMode: (mode: ViewMode) => void;
  activeNavTab: string;
  onSelectNavTab: (tab: string) => void;
  points: number;
}

export const TopNav: React.FC<TopNavProps> = ({
  viewMode,
  onSelectViewMode,
  activeNavTab,
  onSelectNavTab,
  points
}) => {
  return (
    <header className="top-nav">
      <div className="top-nav-inner">
        {/* Left: Brand + Workspace + Nav */}
        <div className="nav-left">
          <div className="brand-badge">
            <div className="brand-icon">Z</div>
            <span>Ziki</span>
          </div>

          <div className="workspace-picker">
            <span>Ziki</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M6 9l6 6 6-6" />
            </svg>
          </div>

          <nav className="nav-links">
            <button
              className={`nav-link-btn ${activeNavTab === 'issues' ? 'active' : ''}`}
              onClick={() => onSelectNavTab('issues')}
            >
              Product &gt; Issues
            </button>
            <button
              className={`nav-link-btn ${activeNavTab === 'marketing' ? 'active' : ''}`}
              onClick={() => onSelectNavTab('marketing')}
            >
              Marketing
            </button>
            <button
              className={`nav-link-btn ${activeNavTab === 'security' ? 'active' : ''}`}
              onClick={() => onSelectNavTab('security')}
            >
              Security
            </button>
            <button
              className={`nav-link-btn ${activeNavTab === 'agents' ? 'active' : ''}`}
              onClick={() => onSelectNavTab('agents')}
            >
              Agents
            </button>
          </nav>
        </div>

        {/* Center: View Switcher (Before vs After) */}
        <div className="view-switcher-pill" role="tablist" aria-label="Prototype View Switcher">
          <button
            role="tab"
            aria-selected={viewMode === 'before'}
            className={`switcher-btn ${viewMode === 'before' ? 'active' : ''}`}
            onClick={() => onSelectViewMode('before')}
            title="Press '1' on keyboard to switch"
          >
            <span>Today's Ziki (/before)</span>
            <span className="switcher-badge">Baseline</span>
          </button>
          <button
            role="tab"
            aria-selected={viewMode === 'after'}
            className={`switcher-btn ${viewMode === 'after' ? 'active' : ''}`}
            onClick={() => onSelectViewMode('after')}
            title="Press '2' on keyboard to switch"
          >
            <span>New Operator Flow (/)</span>
            <span className="switcher-badge">2-Second</span>
          </button>
        </div>

        {/* Right: Points + Bell (11 blue) + User */}
        <div className="nav-right">
          <div className="points-chip" title="Current verified points">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="#f59e0b">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
            <span>{points.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} pts</span>
          </div>

          <button className="bell-btn" aria-label="11 unread notifications" title="11 unread notifications">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
            <span className="bell-badge-blue">11</span>
          </button>

          <button className="user-avatar-btn" title="Abuchi Collins (Operator)">
            AC
          </button>
        </div>
      </div>
    </header>
  );
};
