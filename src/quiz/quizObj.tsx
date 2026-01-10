export type Quiz = {
  question: string;
  answer: {
    answers: string[];
    correctIndex: number;
  };
};

export const quizSelect: Quiz[] = [
  {
    question: "Preferred way to die?",
    answer: {
      answers: [
        "Exploring a cave",
        "Wrestling match with Velociraptor",
        "Eating too much pad thai",
        "Seeing what's in a black hole!",
      ],
      correctIndex: 3,
    },
  },
  {
    question: "Favorite Avenger?",
    answer: {
      answers: ["Thor", "Captain America", "Iron-Man", "Hulk"],
      correctIndex: 0,
    },
  },
  {
    question: "What year was I born?",
    answer: {
      answers: ["1845", "1991", "1981", "1663"],
      correctIndex: 2,
    },
  },
];
