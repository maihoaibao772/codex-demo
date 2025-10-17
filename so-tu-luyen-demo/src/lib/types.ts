export type StatKey = 'qi' | 'will' | 'fate' | 'rep';

export interface Stats {
  qi: number;
  will: number;
  fate: number;
  rep: number;
}

export interface ChoiceEffect {
  stats?: Partial<Record<StatKey, number>>;
  addItem?: string;
  removeItem?: string;
  addArtifact?: string;
  addTalent?: string;
  risk?: 'low' | 'medium' | 'high';
  log?: string;
  triggerTribulation?: boolean;
}

export interface ChoiceFollowup {
  id: string;
  weight?: number;
}

export interface Choice {
  text: string;
  effects: ChoiceEffect;
  skillCheck?: {
    stat: StatKey;
    threshold: number;
    success: ChoiceEffect;
    fail?: ChoiceEffect;
  };
  followups?: ChoiceFollowup[];
}

export interface GameEvent {
  id: string;
  title: string;
  body: string;
  tags: string[];
  choices: Choice[];
}

export interface Artifact {
  id: string;
  name: string;
  description: string;
  tags: string[];
}

export interface Talent {
  id: string;
  name: string;
  description: string;
}

export interface OathTrait {
  keywords: string[];
  title: string;
  description: string;
  effects: Partial<Record<StatKey, number>>;
  triggerTags?: string[];
}

export interface RunMeta {
  artifacts: string[];
  talents: string[];
  cracks: number;
}

export interface RunLogEntry {
  id: string;
  type: 'event' | 'choice' | 'system';
  content: string;
  timestamp: number;
}

export interface TribulationOption {
  id: string;
  sequence: string[];
  correct: boolean;
}
