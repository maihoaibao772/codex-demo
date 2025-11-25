export type VocabularyItem = {
  id: number;
  hanzi: string;
  pinyin: string;
  meaningVi: string;
  levelHSK: number;
  topic: string;
};

export type FlashcardItem = {
  id: number;
  front: string;
  back: string;
  example: string;
  levelHSK: number;
  topic: string;
};

export type ExerciseType = 'multiple' | 'fill' | 'match';

export type ExerciseQuestion = {
  id: number;
  type: ExerciseType;
  question: string;
  options?: string[];
  answer: string;
  explanation?: string;
};

export type GrammarPoint = {
  id: number;
  title: string;
  explanation: string;
  pattern: string;
  examples: string[];
  quiz?: ExerciseQuestion[];
};

export type RoadmapStep = {
  level: string;
  description: string;
  focus: string[];
  resources: string[];
};

export type BlogPost = {
  id: number;
  slug: string;
  title: string;
  summary: string;
  content: string;
  tags: string[];
  date: string;
};

export type Event = {
  id: number;
  title: string;
  date: string;
  description: string;
  link?: string;
};
