import React, { useState, useEffect, useRef } from 'react';
import { ViewMode, DecisionItem } from './types';
import { SEED_STATS, INITIAL_DECISIONS } from './data/seed';
import { TopNav } from './components/TopNav';
import { BeforeView } from './components/BeforeView';
import { AfterView } from './components/AfterView';

interface UndoState {
  decision: DecisionItem;
  action: 'approved' | 'declined';
  message: string;
}

export const App: React.FC = () => {
  // Sync viewMode with URL hash (#before vs #after or default /)
  const getInitialViewMode = (): ViewMode => {
    if (typeof window !== 'undefined' && window.location.hash === '#before') {
      return 'before';
    }
    return 'after';
  };

  const [viewMode, setViewMode] = useState<ViewMode>(getInitialViewMode);
  const [activeNavTab, setActiveNavTab] = useState<string>('issues');

  // Decision Queue State
  const [queue] = useState<DecisionItem[]>(INITIAL_DECISIONS);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [undoState, setUndoState] = useState<UndoState | null>(null);
  const [undoSeconds, setUndoSeconds] = useState<number>(10);

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Sync hash when viewMode changes
  const handleSelectViewMode = (mode: ViewMode) => {
    setViewMode(mode);
    if (typeof window !== 'undefined') {
      window.location.hash = mode === 'before' ? '#before' : '#after';
    }
  };

  // Listen to hash changes (e.g. browser back/forward or direct links)
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#before') {
        setViewMode('before');
      } else {
        setViewMode('after');
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const currentDecision = currentIndex < queue.length ? queue[currentIndex] : null;

  // Decision handlers
  const handleAction = (action: 'approved' | 'declined') => {
    if (!currentDecision) return;

    const actionText = action === 'approved' ? 'Approved & Merged' : 'Declined';
    const msg = `${actionText}: "${currentDecision.headline}"`;

    // Clear existing timer if any
    if (timerRef.current) clearTimeout(timerRef.current);
    if (intervalRef.current) clearInterval(intervalRef.current);

    setUndoState({
      decision: currentDecision,
      action,
      message: msg
    });
    setUndoSeconds(10);

    // Advance queue
    setCurrentIndex((prev) => prev + 1);

    // Countdown interval
    intervalRef.current = setInterval(() => {
      setUndoSeconds((prev) => {
        if (prev <= 1) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Auto dismiss after 10 seconds
    timerRef.current = setTimeout(() => {
      setUndoState(null);
    }, 10000);
  };

  const handleUndo = () => {
    if (!undoState) return;

    if (timerRef.current) clearTimeout(timerRef.current);
    if (intervalRef.current) clearInterval(intervalRef.current);

    // Restore index
    setCurrentIndex((prev) => Math.max(0, prev - 1));
    setUndoState(null);
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setUndoState(null);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if user is typing in an input
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) {
        return;
      }

      if (e.key === '1') {
        handleSelectViewMode('before');
      } else if (e.key === '2') {
        handleSelectViewMode('after');
      } else if (viewMode === 'after') {
        if (e.key === 'Enter' || e.key === 'a' || e.key === 'A') {
          if (currentDecision) {
            e.preventDefault();
            handleAction('approved');
          }
        } else if (e.key === 'Escape' || e.key === 'd' || e.key === 'D') {
          if (currentDecision) {
            e.preventDefault();
            handleAction('declined');
          }
        } else if (e.key === 'u' || e.key === 'U' || e.key === 'z' || e.key === 'Z') {
          if (undoState) {
            e.preventDefault();
            handleUndo();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [viewMode, currentDecision, undoState]);

  return (
    <div className="ziki-app">
      {/* Sticky Top Navigation */}
      <TopNav
        viewMode={viewMode}
        onSelectViewMode={handleSelectViewMode}
        activeNavTab={activeNavTab}
        onSelectNavTab={setActiveNavTab}
        points={SEED_STATS.points}
      />

      {/* Main Content */}
      <main className="app-container">
        {viewMode === 'before' ? (
          <BeforeView />
        ) : (
          <AfterView
            currentDecision={currentDecision}
            currentIndex={currentIndex}
            totalDecisions={queue.length}
            onApprove={() => handleAction('approved')}
            onDecline={() => handleAction('declined')}
            onReset={handleReset}
          />
        )}
      </main>

      {/* 10-Second Undo Toast */}
      {undoState && (
        <div className="undo-toast" role="alert" aria-live="assertive">
          <div
            className="toast-progress-bar"
            style={{
              width: `${(undoSeconds / 10) * 100}%`,
              transition: 'width 1s linear'
            }}
          ></div>
          <div className="toast-text">
            <span>{undoState.message}</span>
          </div>
          <button
            className="btn-undo-action"
            onClick={handleUndo}
            title="Press 'U' to undo"
          >
            Undo ({undoSeconds}s)
          </button>
        </div>
      )}
    </div>
  );
};
