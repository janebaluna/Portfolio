export interface Project {
  id: string;
  num: number;
  title: string;
  icon: string;
  category: string;
  image: string;
  desc: string;
  details: string[];
  tools: string[];
  outcome: string;
  codeSnippet?: string;
  hasInteractiveCalculator?: boolean;
  hasInteractiveBrickBreaker?: boolean;
  hasInteractiveLoveResponder?: boolean;
  liveUrl?: string;
}

export interface Skill {
  name: string;
  icon: string;
}

export interface Achievement {
  num: number;
  tag: string;
  title: string;
  desc: string;
}

export interface Goal {
  id: string;
  title: string;
}

export interface Hobby {
  num: number;
  title: string;
  image: string;
  alt: string;
}
