
export interface Task {
  id: number;
  title: string;
  chapter: number;
  startWeek: number;
  duration: number;
  color: string;
  priority: 'high' | 'medium' | 'low';
  x: number;
  y: number;
  notes: string;
  calendarAlert: boolean;
  size?: number;
}

export interface Connection {
  id: number;
  from: number;
  to: number;
}

export interface Chapter {
  name: string;
  color: string;
}

export interface Chapters {
  [key: number]: Chapter;
}
