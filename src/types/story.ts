export interface StoryBody {
  content: string;
  title: string;
  tag: string;
  createdAt: Date;
}

export interface Story extends StoryBody {
  id: string;
}
