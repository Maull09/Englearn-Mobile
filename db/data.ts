// Data untuk aplikasi
const units = [
    {
      id: 1,
      title: "Simple Present Tense",
      description: "Basics of Simple Present Tense",
      order: 1,
      lessons: [
        {
          id: 1,
          title: "Introduction",
          lessonType: "VIDEO",
          videoUrl: "/intro.mp4",
          order: 1,
          challenges: [],
        },
        {
          id: 2,
          title: "Positive Form",
          lessonType: "QUIZ",
          order: 2,
          challenges: [
            {
              id: 1,
              question: "Which sentence is in the positive form?",
              options: [
                { text: "I play football.", correct: true },
                { text: "I don't play football.", correct: false },
                { text: "Do I play football?", correct: false },
              ],
            },
          ],
        },
        {
          id: 3,
          title: "Negative Form",
          lessonType: "QUIZ",
          order: 3,
          challenges: [
            {
              id: 2,
              question: "Which sentence is in the negative form?",
              options: [
                { text: "She likes pizza.", correct: false },
                { text: "She doesn't like pizza.", correct: true },
                { text: "Does she like pizza?", correct: false },
              ],
            },
          ],
        },
        {
          id: 4,
          title: "Interrogative Form",
          lessonType: "QUIZ",
          order: 4,
          challenges: [
            {
              id: 3,
              question: "Which sentence is in the interrogative form?",
              options: [
                { text: "He runs fast.", correct: false },
                { text: "He doesn't run fast.", correct: false },
                { text: "Does he run fast?", correct: true },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 2,
      title: "Present Continuous Tense",
      description: "Basics of Present Continuous Tense",
      order: 2,
      lessons: [
        {
          id: 5,
          title: "Introduction",
          lessonType: "VIDEO",
          videoUrl: "/present-continuous-intro.mp4",
          order: 1,
          challenges: [],
        },
        {
            id: 6,
            title: "Positive Form",
            lessonType: "QUIZ",
            order: 2,
            challenges: [
              {
                id: 4,
                question: "Which sentence is in the positive form?",
                options: [
                  { text: "I am playing football.", correct: true },
                  { text: "I don't play football.", correct: false },
                  { text: "Do I play football?", correct: false },
                ],
              },
            ],
        },
        {
            id: 7,
            title: "Negative Form",
            lessonType: "QUIZ",
            order: 3,
            challenges: [
              {
                id: 5,
                question: "Which sentence is in the negative form?",
                options: [
                  { text: "She likes pizza.", correct: false },
                  { text: "She isn't like pizza.", correct: true },
                  { text: "Does she like pizza?", correct: false },
                ],
              },
            ],
        },
        {
            id: 8,
            title: "Interrogative Form",
            lessonType: "QUIZ",
            order: 4,
            challenges: [
              {
                id: 6,
                question: "Which sentence is in the interrogative form?",
                options: [
                  { text: "He runs fast.", correct: false },
                  { text: "He doesn't run fast.", correct: false },
                  { text: "Does he run fast?", correct: true },
                ],
              },
            ],
        },
      ],
    },
  ];
  
  // Fungsi untuk mendapatkan unit
  export const getUnits = () => {
    return units;
  };
  
  // Fungsi untuk mendapatkan lessons berdasarkan unit ID
  export const getLessonsByUnitId = (unitId: number) => {
    const unit = units.find((unit) => unit.id === unitId);
    return unit ? unit.lessons : [];
  };
  
  // Fungsi untuk mendapatkan challenges berdasarkan lesson ID
  export const getChallengesByLessonId = (lessonId: number) => {
    for (const unit of units) {
      for (const lesson of unit.lessons) {
        if (lesson.id === lessonId) {
          return lesson.challenges;
        }
      }
    }
    return [];
  };
  