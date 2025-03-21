interface Question {
  answered: boolean;
  id: number;
  question: string;
  star_rating: number;
}

interface CleanedQuestions {
  id: number;
  question: string;
  star_rating: number;
  answered: boolean;
}


export type { Question, CleanedQuestions };
