export interface Reaction {
  id: string;
  emoji: string;
}

export interface Reply {
  id: string;
  text: string;
}

export interface Comment {
  id: string;
  body: string;
  reactions?: Reaction[];
  replies?: Reply[];
}
