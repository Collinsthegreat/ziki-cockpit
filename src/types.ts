export type ViewMode = 'before' | 'after';

export interface DecisionItem {
  id: string;
  category: string;
  headline: string;
  askingAgent: string;
  agentModel: string;
  impact: string;
  impactType: 'danger' | 'warn' | 'info';
  diff: string;
  ciStatus: string;
  primaryLabel: string;
  secondaryLabel: string;
  severity: 'normal' | 'warn' | 'rollback';
}

export interface IssueItem {
  id: number;
  title: string;
  votes: number;
  comments: number;
  type: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'In Progress' | 'Open' | 'Done';
  stage: 'Dev' | 'Staging' | 'Prod';
  reported: string;
}

export interface AgentItem {
  name: string;
  status: 'Idle' | 'Offline' | 'Working';
  currentActivity: string;
  lastSeen: string;
}

export interface StatCounts {
  points: number;
  createdByMe: number;
  assignedToMe: number;
  resolved: number;
  totalIssues: number;
  open: number;
  inProgress: number;
  done: number;
  readyToMerge: number;
  autoMerge: number;
  needInput: number;
  designFeedback: number;
  newIdeas: number;
  draftedIdeas: number;
}
