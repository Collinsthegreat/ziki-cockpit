import { DecisionItem, IssueItem, AgentItem, StatCounts } from '../types';

export const SEED_STATS: StatCounts = {
  points: 4355.96,
  createdByMe: 12,
  assignedToMe: 23,
  resolved: 89,
  totalIssues: 264,
  open: 123,
  inProgress: 23,
  done: 111,
  readyToMerge: 0,
  autoMerge: 7,
  needInput: 0,
  designFeedback: 0,
  newIdeas: 2,
  draftedIdeas: 46
};

export const SEED_ISSUES: IssueItem[] = [
  {
    id: 456,
    title: '[UI/UX] Optimize issue metadata layout for high density',
    votes: 12,
    comments: 5,
    type: 'UI/UX',
    priority: 'Medium',
    status: 'In Progress',
    stage: 'Staging',
    reported: '2d ago'
  },
  {
    id: 522,
    title: '[UI/UX] Team page should show member details only on click',
    votes: 6,
    comments: 4,
    type: 'UI/UX',
    priority: 'Low',
    status: 'Open',
    stage: 'Dev',
    reported: '3d ago'
  },
  {
    id: 1294,
    title: 'Clear billing checkout session_id on redirect',
    votes: 18,
    comments: 7,
    type: 'Bug',
    priority: 'High',
    status: 'In Progress',
    stage: 'Dev',
    reported: '1d ago'
  },
  {
    id: 1105,
    title: 'Add webhook retry backoff policy for flaky endpoints',
    votes: 9,
    comments: 2,
    type: 'Backend',
    priority: 'Medium',
    status: 'Open',
    stage: 'Dev',
    reported: '4d ago'
  },
  {
    id: 892,
    title: 'Fix dark mode flash on initial page load',
    votes: 15,
    comments: 3,
    type: 'Bug',
    priority: 'Low',
    status: 'Done',
    stage: 'Staging',
    reported: '5d ago'
  }
];

export const SEED_AGENTS: AgentItem[] = [
  {
    name: 'Quantum-Tester',
    status: 'Idle',
    currentActivity: 'Standing by',
    lastSeen: '2m ago'
  },
  {
    name: 'Quantum-Triager',
    status: 'Idle',
    currentActivity: 'Standing by',
    lastSeen: '5m ago'
  },
  {
    name: 'Quantum-Reviewer',
    status: 'Idle',
    currentActivity: 'Standing by',
    lastSeen: '1m ago'
  },
  {
    name: 'Personal Agent',
    status: 'Offline',
    currentActivity: 'Disconnected',
    lastSeen: '1d ago'
  },
  {
    name: 'Quantum-Dispatcher',
    status: 'Idle',
    currentActivity: 'Standing by',
    lastSeen: '10m ago'
  }
];

export const INITIAL_DECISIONS: DecisionItem[] = [
  {
    id: 'dec-1',
    category: 'PR Approval',
    headline: 'Merge branch fix/1294 into production?',
    askingAgent: 'Quantum-Reviewer',
    agentModel: 'Gemini',
    impact: 'If ignored: Billing fix blocked from staging',
    impactType: 'danger',
    diff: '+14 lines, -8 lines · 14/14 CI tests PASS',
    ciStatus: 'PASS',
    primaryLabel: 'Approve & Merge',
    secondaryLabel: 'Decline',
    severity: 'normal'
  },
  {
    id: 'dec-2',
    category: 'New Feature Idea',
    headline: 'Promote drafted caching strategy to Dev?',
    askingAgent: 'Quantum-Triager',
    agentModel: 'Gemini',
    impact: 'If ignored: Cache invalidation milestone delayed 24h',
    impactType: 'warn',
    diff: 'Draft #42 · Pre-ranked #1 of 46 ideas by Quantum agents',
    ciStatus: 'READY',
    primaryLabel: 'Approve Proposal',
    secondaryLabel: 'Keep as Draft',
    severity: 'warn'
  },
  {
    id: 'dec-3',
    category: 'Agent Escalation',
    headline: 'Roll back failed Docker staging build #891?',
    askingAgent: 'Quantum-Tester',
    agentModel: 'Gemini',
    impact: 'If ignored: Staging cluster unhealthy for 4 contributors',
    impactType: 'danger',
    diff: 'Worker exit code 137 (OOM) · One-click rollback to tag v2.4.1',
    ciStatus: 'FAILED',
    primaryLabel: 'Rollback to v2.4.1',
    secondaryLabel: 'Keep & Inspect Logs',
    severity: 'rollback'
  }
];
